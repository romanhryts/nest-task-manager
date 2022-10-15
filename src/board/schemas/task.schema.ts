import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

type TaskStatus = 'TODO' | 'PROGRESS' | 'DONE | ARCHIVE';

export type TaskDocument = Task & Document;

@Schema({ versionKey: false, timestamps: true })
export class Task {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    status: TaskStatus;

    @Prop({ default: [] })
    comments: string[];

}

export const TaskSchema = SchemaFactory.createForClass(Task);
