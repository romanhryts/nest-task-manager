import { ObjectId } from 'mongoose';

export class LoginResponseDto {
    readonly name: string;
    readonly id: ObjectId;
}
