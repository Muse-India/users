import { createClient } from "redis";

export const redis = createClient({
  url: process.env.REDIS_URL || "redis://localhost:6379",
});
redis.on("error", (err) => console.log("Redis Client Error", err));

// TODO: remove this line before deployment
redis.on("connect", () => console.log("Redis Client Connected"));

await redis.connect();

await redis.ping(); // 'PONG'
