import { Context, Next } from "hono";
import { responseTimeMetrics } from "../libs/metrics/server/responseTime";

export const responseTimeMiddleware = async (c: Context, next: Next) => {
  const start = process.hrtime();
  await next();
  const diff = process.hrtime(start);
  const time = diff[0] * 1e3 + diff[1] * 1e-6; // Convert to milliseconds

  responseTimeMetrics
    .labels({
      method: c.req.method,
      route: c.req.url,
      status: c.res.status,
    })
    .observe(time);
};
