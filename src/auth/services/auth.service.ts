import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../modules/auth.user.entity';
import { IUser } from '../modules/auth.user.interface';
import Crypto from 'src/helpers/Crypo';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserEntity) 
        private readonly userRepository: Repository<UserEntity>,
        private jwtService: JwtService
    ) {}

    async registerAccount(user: IUser): Promise<IUser> {
        const {firstName, lastName, email, password} = user;

        const userDb = await this.userRepository.findOne({email});
        if(userDb) throw new HttpException('This email already exist', HttpStatus.BAD_REQUEST);

        const hashedPassword = await Crypto.hash(password);

        return this.userRepository.save({
            firstName,
            lastName,
            email,
            password: hashedPassword
        });
    }

    async validateUser(email: string, password: string): Promise<IUser> {
        const user = await this.userRepository.findOne({email}, {select: ['password']});
        if(!user) return null;
        if(!await Crypto.compare(password, user.password)) return null;

        return user;
    }

    async login(user: IUser): Promise<{token: string}> {
        const {email, password} = user;
        const validatedUser = await this.validateUser(email, password);

        if(!validatedUser) throw new HttpException('Invalid credentials', HttpStatus.BAD_REQUEST);
        const token = await this.jwtService.sign({user});
        return {token};
    }
}
