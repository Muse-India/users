import { Kafka, logLevel } from "kafkajs";

export const kafka = new Kafka({
    clientId: "users-service",
    brokers: [process.env.KAFKA_BROKER_URL as string],
    logLevel: logLevel.ERROR
})

export const admin = kafka.admin();
export const producer = kafka.producer();
export const consumer = kafka.consumer({ groupId: "users-group" });