import { createClient } from "redis";

export const redis = createClient({
  url: process.env.REDIS_URL || "redis://localhost:6379",
});
redis.on("error", (err) => console.log("Redis Client Error", err));
await redis.connect();

await redis.ping(); // 'PONG'