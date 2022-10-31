import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId } from 'mongoose';
import * as mongoose from 'mongoose';


export type BoardDocument = Board & Document;

@Schema({ versionKey: false, timestamps: true })
export class Board {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    description: string;

    @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    user_id: ObjectId;

    @Prop({default: '87cefa'})
    todoListColor: string;

    @Prop({default: '87cefa'})
    progressListColor: string;

    @Prop({default: '87cefa'})
    doneListColor: string;

    @Prop({
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task', default: [] }]
    })
    tasks: ObjectId[];
}

export const BoardSchema = SchemaFactory.createForClass(Board);
