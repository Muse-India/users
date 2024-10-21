import { userRepository } from "../redis/redis.repository";
import { prisma } from "./getPrisma";

export const getUser = async (email: string) => {
    // fetch the user from the cache
    try {
        const userFromCache = await userRepository.fetch(`user:${email}`);

        if (userFromCache?.name) {
            return userFromCache;
        }

        // fetch the user from the database
        const userFromDB = await prisma.user.findUnique({ where: { email } });

        if (userFromDB) {
            await userRepository.save(userFromDB.email, userFromDB);
            return userFromDB;
        }

        return null;
    } catch (error) {
        console.log(error);
        throw new Error("error fetching user see @/libs/utils/getUser.ts");
    }
};