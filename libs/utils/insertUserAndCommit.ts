import { KafkaMessage } from "kafkajs";
import { consumer } from "../kafka/kafka.client";
import { userType } from "../types/userType";
import { prisma } from "./getPrisma";

type userMessageProps = {
  userArray: userType[];
  partition: number;
  message: KafkaMessage;
};

export const insertUserAndCommit = async ({
  userArray,
  partition,
  message,
}: userMessageProps) => {
  try {
    // Inserting users to database
    await prisma.user.createMany({ data: userArray }).catch((error) => {
      console.log("Error while inserting users: ", error);
    });

    await consumer.commitOffsets([
      {
        topic: "users",
        partition: partition,
        offset: (parseInt(message.offset) + 1).toString(),
      },
    ]);
  } catch (error) {
    console.log("Error while inserting users: ", error);
    throw new Error("Error while inserting users");
  }
};
