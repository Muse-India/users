import { createAdmin } from "../kafka/kafka.admin";
import { consumerRegistration } from "../kafka/kafka.consumer";

export const startServer = async () => {
  try {
    await createAdmin();
    console.log("Admin created successfully");

    await consumerRegistration();
    console.log("Consumer started successfully");

    console.log("Application started successfully");
  } catch (error) {
    console.log("Error starting the application", error);
  }
};
