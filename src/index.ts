import { Hono } from "hono";
import { cors } from "hono/cors";
import userRoutes from "./routes/routes";
import { connectToRedis } from "../libs/redis/redis.index";
import { startServer } from "../libs/utils/startServer";

const PORT = process.env.PORT || 3000;

// the default route of the application will be <domain>/api
// example -> localhost:3000/api
const app = new Hono().basePath("/api");

// enable cors
app.use(cors());

// configuring redis cache
await connectToRedis();

// Create the Kafka topics and start the consumer
startServer().catch((error) =>
  console.log("Error starting the application", error)
);

app.route("/users", userRoutes);

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

export default {
  port: PORT,
  fetch: app.fetch,
};
