import { Context } from "hono";
import { collectDefaultMetrics, Registry } from "prom-client";

export const serverRegistry = new Registry();

// collect default server metrics
collectDefaultMetrics({
  register: serverRegistry,
});

export const serverMetrics = async (c: Context) => {
  c.res.headers.set("Content-Type", serverRegistry.contentType);
  const metrics = await serverRegistry.metrics();
  return c.text(metrics);
};
