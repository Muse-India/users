import { KafkaMessage } from "kafkajs";
import { userArrayMap } from "../constants/arrays";
import { KAFKA_USER_BATCH_SIZE } from "../constants/batchSize";
import { insertUserAndCommit } from "./insertUserAndCommit";
import { messageQueueCountMetrics } from "../metrics/kafka/messageQueueCount";

type userMessageProps = {
  partition: number;
  message: KafkaMessage;
};

export const processUserMessages = async ({
  partition,
  message,
}: userMessageProps) => {
  // parsing the user into JSON format
  const parsedUser = JSON.parse(message.value?.toString() || "{}");

  // pushing the message to the userArray
  if (!userArrayMap[partition]) {
    userArrayMap[partition] = [];
  }

  const userExists = userArrayMap[partition].some(
    (user) => JSON.stringify(user) === JSON.stringify(parsedUser)
  );

  if (userExists) {
    console.log("User already exists in the array so skipping this user");
  } else {
    userArrayMap[partition].push(parsedUser);
  }

  if (userArrayMap[partition].length >= KAFKA_USER_BATCH_SIZE) {
    // Inserting users to database and commiting kafka offset
    await insertUserAndCommit({
      userArray: userArrayMap[partition],
      partition,
      message,
    });

    // clearing the userArray
    userArrayMap[partition] = [];

    // resetting message count the metrics to 0
    messageQueueCountMetrics
      .labels("users-registrations", partition.toString())
      .set(0);

    return userArrayMap[partition];
  }

  console.log(userArrayMap[partition].length);

  console.log("User Array Map: ", userArrayMap[partition]);

  // sending metrics to prometheus
  messageQueueCountMetrics
    .labels("users-registrations", partition.toString())
    .set(userArrayMap[partition].length);

  return userArrayMap[partition];
};
