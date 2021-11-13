import * as bcrypt from 'bcrypt';

export default class Crypto {
    public static hash(data: string): Promise<string> {
        return bcrypt.hash(data, 12);
    }

    public static compare(data:string, encrypted: string): Promise<boolean> {
        return bcrypt.compare(data, encrypted);
    }
}