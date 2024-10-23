import { Hono } from "hono";
import { serverMetrics } from "../controllers/serverMatrics";
import { kafkaMetrics } from "../controllers/kafkaMatrics";

const app = new Hono();

app.get("/server", serverMetrics);
app.get("/kafka", kafkaMetrics);

export default app;
