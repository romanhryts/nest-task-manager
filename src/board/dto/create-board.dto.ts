import { ObjectId } from 'mongoose';

export class CreateBoardDto {
    readonly name: string;
    readonly description: string;
    readonly user_id: ObjectId;
}
