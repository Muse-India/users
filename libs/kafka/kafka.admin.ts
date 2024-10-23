import { admin } from "./kafka.client";

export const createAdmin = async () => {
  try {
    await admin.connect();
    console.log("Admin connected");

    await admin.createTopics({
      topics: [
        {
          topic: "users-registrations",
          numPartitions: 2,
          replicationFactor: 1,
        },
      ],
    });
    console.log("Topics created successfully");
  } catch (error) {
    console.log(error);
  } finally {
    await admin.disconnect();
    console.log("Admin disconnected");
  }
};
