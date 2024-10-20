import { redisRepository } from "./redis.repository";

export const connectToRedis = async () => {
  await redisRepository.createIndex();
};
