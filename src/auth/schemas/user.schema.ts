import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type UserDocument = User & Document;

@Schema({
    versionKey: false
})
export class User {
    @Prop({
        required: true
    })
    name: string;

    @Prop({
        required: true,
        unique: true
    })
    email: string;

    @Prop({
        required: true
    })
    password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
