import { userType } from "../types/userType";
import { producer } from "./kafka.client";

export const produceUsers = async (user: userType) => {
  try {
    await producer.connect();
    console.log("Producer connected");

    const country = user.country;

    await producer.send({
      topic: "users-registrations",
      messages: [
        {
          value: JSON.stringify(user),
          partition: country === "India" ? 0 : 1,
        },
      ],
    });

    console.log("User sent successfully");
  } catch (error: any) {
    console.log(error.messages);
  } finally {
    await producer.disconnect();
    console.log("Producer disconnected");
  }
};
