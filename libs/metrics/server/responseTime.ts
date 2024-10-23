import { Histogram } from "prom-client";
import { serverRegistry } from "../../../src/controllers/serverMatrics";

export const responseTimeMetrics = new Histogram({
  name: "http_request_duration_seconds",
  help: "Duration of HTTP requests in seconds",
  labelNames: ["method", "route", "status"],
  registers: [serverRegistry],
});
