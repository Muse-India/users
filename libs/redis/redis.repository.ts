import { Repository } from "redis-om";
import { redisSchema } from "./redis.schema";
import { redis } from "./redis.client";

export const redisRepository = new Repository(redisSchema, redis);
