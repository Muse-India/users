import { Context } from "hono";
import { collectDefaultMetrics, Registry } from "prom-client";

export const kakfaregister = new Registry();

// collect default kafka metrics
collectDefaultMetrics({ register: kakfaregister });

export const kafkaMetrics = async (c: Context) => {
  c.res.headers.set("Content-Type", kakfaregister.contentType);
  const metrics = await kakfaregister.metrics();
  return c.text(metrics);
};
