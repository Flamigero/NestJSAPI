import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../modules/auth.user.entity';
import { IUser } from '../modules/auth.user.interface';
import Crypto from 'src/helpers/Crypo';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserEntity) 
        private readonly userRepository: Repository<UserEntity>
    ) {}

    hashPassword(password: string): Promise<string> {
        return Crypto.hash(password);
    }

    async registerAccount(user: IUser): Promise<IUser> {
        const {firstName, lastName, email, password} = user;
        const hashedPassword = await this.hashPassword(password);

        return this.userRepository.save({
            firstName,
            lastName,
            email,
            password: hashedPassword
        });
    }
}
