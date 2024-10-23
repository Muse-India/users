import { Hono } from "hono";
import { cors } from "hono/cors";
import { connectToRedis } from "../libs/redis/redis.index";
import { startServer } from "../libs/utils/startServer";
import { responseTimeMiddleware } from "../middlewares/responseTimeMiddleware";
import metricsRoutes from "./routes/metrics.routes";
import userRoutes from "./routes/user.routes";

const PORT = process.env.PORT || 3000;

// the default route of the application will be <domain>/api
// example -> localhost:3000/api
const app = new Hono().basePath("/api");

// middlewares
app.use(cors());

// response time middleware
app.use(responseTimeMiddleware);

// configuring redis cache
await connectToRedis();

// Create the Kafka topics and start the consumer
startServer().catch((error) =>
  console.log("Error starting the application", error)
);

app.route("/users", userRoutes);
app.route("/metrics", metricsRoutes);

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

export default {
  port: PORT,
  fetch: app.fetch,
};
