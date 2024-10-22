import { Context } from "hono";

export const healthCheck = async (c: Context) => {
  try {
    return c.json({ message: "Server is up and running" }, 200);
  } catch (error) {
    return c.json({ error: "Error checking the server status", status: 500 });
  }
};
