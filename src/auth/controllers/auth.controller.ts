import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LoginUserDto, RegisterUserDto } from '../modules/auth.dto';
import { IUser } from '../modules/auth.user.interface';
import { AuthService } from '../services/auth.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}
    
    @Post('register')
    register(@Body() user: RegisterUserDto): Promise<IUser> {
        return this.authService.registerAccount(user);
    }

    @Post('login')
    login(@Body() user: LoginUserDto): Promise<{token: string}> {
        return this.authService.login(user);
    }
}
