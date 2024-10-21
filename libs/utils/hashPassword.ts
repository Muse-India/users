import { hash } from 'bcrypt';

type hashPasswordProps = {
    password: string;
    salt?: number;
}

export const hashPassword = async ({ password, salt = 10 }: hashPasswordProps): Promise<string> => {

    return hash(password, salt);

}