import { KafkaMessage } from "kafkajs";
import { processUserMessages } from "../utils/processUserMessages";
import { consumer } from "./kafka.client";

export const consumerRegistration = async () => {
  await consumer.connect();
  console.log("Kafka Consumer connected");

  await consumer.subscribe({
    topics: ["users-registrations"],
    fromBeginning: true,
  });
  console.log("Consumer subscribed to users topic");

  await consumer.run({
    autoCommit: false,

    eachMessage: async ({
      partition,
      message,
    }: {
      partition: number;
      message: KafkaMessage;
    }) => {
      const usersArray = await processUserMessages({ partition, message });

      console.log("Users Array: ", usersArray);
    },
  });
};
