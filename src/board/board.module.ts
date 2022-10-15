import { Module } from '@nestjs/common';
import { BoardService } from './board.service';
import { BoardController } from './board.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Board, BoardSchema } from './schemas/board.schema';
import { Task, TaskSchema } from './schemas/task.schema';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Board.name, schema: BoardSchema },
            { name: Task.name, schema: TaskSchema },
        ]),
        JwtModule.register({
            secret: '' + process.env.JWT_SECRET,
            signOptions: {
                expiresIn: '1d'
            }
        })
    ],
    providers: [BoardService],
    controllers: [BoardController]
})
export class BoardModule {
}
