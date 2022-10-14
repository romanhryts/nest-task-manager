import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';
import { User, UserDocument } from './schemas/user.schema';
import { RegisterUserDto } from './dto/register-user.dto';
import { RegisterResponseDto } from './dto/register-response.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { LoginResponseDto } from './dto/login-response.dto';
import { LogoutResponseDto } from './dto/logout-response.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        private jwtService: JwtService
    ) {
    }

    async register(dto: RegisterUserDto): Promise<RegisterResponseDto> {
        try {
            const { name, email, password } = dto;
            if (!name || !email || !password) {
                throw new HttpException('Please provide name, email and password', HttpStatus.BAD_REQUEST);
            }
            const userAlreadyExist: UserDocument = await this.userModel.findOne({ email });
            if (userAlreadyExist) {
                throw new HttpException('User with such email already exists', HttpStatus.BAD_REQUEST);
            }
            const hashedPassword: string = await bcrypt.hash(password, 10);
            await this.userModel.create({ name, email, password: hashedPassword });
            return { message: 'success', status: HttpStatus.CREATED };
        } catch (e) {
            throw new HttpException(e.message, e.status || HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    async login(dto: LoginUserDto, response: Response): Promise<LoginResponseDto> {
        try {
            const { email, password } = dto;
            const user: UserDocument = await this.userModel.findOne({ email });
            if (!user) {
                throw new HttpException('Invalid credentials', HttpStatus.BAD_REQUEST);
            }
            const isPasswordValid: boolean = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                throw new HttpException('Invalid credentials', HttpStatus.BAD_REQUEST);
            }
            const data: LoginResponseDto = { name: user.name, id: user._id };
            const jwt: string = await this.jwtService.signAsync(data);
            response.cookie('jwt', jwt, { httpOnly: true });
            return data;
        } catch (e) {
            throw new HttpException(e.message, e.status || HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async auth(request: Request): Promise<LoginResponseDto> {
        try {
            const cookie: string = request.cookies['jwt'];
            const data: LoginResponseDto = await this.jwtService.verifyAsync(cookie);
            return { name: data.name, id: data.id };
        } catch (e) {
            throw new HttpException('Unauthenticated', HttpStatus.UNAUTHORIZED);
        }

    }

    async logout(response: Response): Promise<LogoutResponseDto> {
        try {
            response.clearCookie('jwt');
            return { message: 'success', status: HttpStatus.OK };
        } catch (e) {
            throw new HttpException(e.message, e.status || HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
