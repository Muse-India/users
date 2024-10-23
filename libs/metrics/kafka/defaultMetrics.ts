import {
  monitorKafkaJSAdmin,
  monitorKafkaJSConsumer,
  monitorKafkaJSProducer,
} from "@christiangalsterer/kafkajs-prometheus-exporter";
import { admin, consumer, producer } from "../../kafka/kafka.client";
import { kakfaregister } from "../../../src/controllers/kafkaMatrics";

// monitor KafkaJS producer
monitorKafkaJSProducer(producer, kakfaregister, {
  defaultLabels: { client_id: "users-service" },
});

// monitor KafkaJS consumer
monitorKafkaJSConsumer(consumer, kakfaregister, {
  defaultLabels: { client_id: "users-service" },
});

// monitor KafkaJS admin
monitorKafkaJSAdmin(admin, kakfaregister, {
  defaultLabels: { client_id: "users-service" },
});
