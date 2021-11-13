import * as bcrypt from 'bcrypt';

export default class Crypto {
    public static hash(data: string): Promise<string> {
        return bcrypt.hash(data, 12);
    }
}