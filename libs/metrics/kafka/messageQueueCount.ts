import { Gauge } from "prom-client";
import { kakfaregister } from "../../../src/controllers/kafkaMatrics";

export const messageQueueCountMetrics = new Gauge({
  name: "message_queue",
  help: "Number of messages in the queue",
  registers: [kakfaregister],
  labelNames: ["topic", "partition"],
});
