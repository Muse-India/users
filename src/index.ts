import { Hono } from "hono";
import { cors } from "hono/cors";
import definedRoutes from "./routes/routes";
import { connectToRedis } from "../libs/redis/redis.index";

const PORT = process.env.PORT || 3000;

// the default route of the application will be <domain>/api
// example -> localhost:3000/api
const app = new Hono().basePath("/api");

// enable cors
app.use(cors());

app.route("/basepath", definedRoutes);

// configuring redis cache
await connectToRedis();

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

export default {
  port: PORT,
  fetch: app.fetch,
};
