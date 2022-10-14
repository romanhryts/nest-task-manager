import { Module } from '@nestjs/common';
import { BoardService } from './board.service';
import { BoardController } from './board.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Board, BoardSchema } from './schemas/board.schema';
import { Task, TaskSchema } from './schemas/task.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Board.name, schema: BoardSchema },
            { name: Task.name, schema: TaskSchema },
        ])
    ],
    providers: [BoardService],
    controllers: [BoardController]
})
export class BoardModule {
}
