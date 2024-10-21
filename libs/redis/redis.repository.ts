import { Repository } from "redis-om";
import { userSchema } from "./redis.schema";
import { redis } from "./redis.client";

export const userRepository = new Repository(userSchema, redis);
