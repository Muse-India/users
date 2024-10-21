import { userRepository } from "../redis/redis.repository";
import { userType } from "../types/userType";

export const addUser = async (data: userType) => {
    // save user to redis-cache
    const user = await userRepository.save(`user:${data.email}`, data);
};