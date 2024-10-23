// define the routes for the application
import { Hono } from "hono";
import { createUser } from "../controllers/createUser";
import { healthCheck } from "../controllers/healthCheck";

const app = new Hono();

// define your routes here
app.post("/create-user", createUser);
app.get("/health-check", healthCheck);

export default app;
