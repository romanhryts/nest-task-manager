import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { RegisterResponseDto } from './dto/register-response.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { LoginResponseDto } from './dto/login-response.dto';
import { LogoutResponseDto } from './dto/logout-response.dto';

@Controller()
export class AuthController {
    constructor(private authService: AuthService) {
    }

    @Post('register')
    async register(@Body() dto: RegisterUserDto): Promise<RegisterResponseDto> {
        return this.authService.register(dto);
    }

    @Post('login')
    async login(
        @Body() dto: LoginUserDto,
        @Res({ passthrough: true }) response: Response
    ): Promise<LoginResponseDto> {
        return this.authService.login(dto, response);
    }

    @Get('auth')
    async auth(@Req() request: Request): Promise<LoginResponseDto> {
        return this.authService.auth(request);
    }

    @Post('logout')
    async logout(
        @Res({ passthrough: true }) response: Response
    ): Promise<LogoutResponseDto> {
        return this.authService.logout(response);
    }

}
