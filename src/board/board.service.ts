import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Board, BoardDocument } from './schemas/board.schema';
import { Model } from 'mongoose';
import { Task, TaskDocument } from './schemas/task.schema';
import { CreateBoardDto } from './dto/create-board.dto';
import { DeleteBoardDto } from './dto/delete-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { AddTaskDto } from './dto/add-task.dto';

@Injectable()
export class BoardService {
    constructor(
        @InjectModel(Board.name) private boardModel: Model<BoardDocument>,
        @InjectModel(Task.name) private taskModel: Model<TaskDocument>
    ) {
    }

    async getAll(id: string): Promise<BoardDocument[]> {
        try {
            const boards: BoardDocument[] = await this.boardModel.find({ user_id: id }).sort({ createdAt: -1 });
            if (!boards.length) {
                throw new HttpException('Boards not found', HttpStatus.NOT_FOUND);
            }
            return boards;
        } catch (e) {
            throw new HttpException(e.message, e.status || HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async getOneBoard(id: string): Promise<BoardDocument> {
        try {
            const board: BoardDocument = await this.boardModel.findOne({ _id: id }).populate('tasks');
            return board;
        } catch (e) {
            throw new HttpException('Board not found', HttpStatus.NOT_FOUND);
        }
    }

    async addBoard(dto: CreateBoardDto): Promise<BoardDocument> {
        try {
            const { name, description, user_id } = dto;
            if (!name || !description || !user_id) {
                throw new HttpException('Please provide name, description and user_id', HttpStatus.BAD_REQUEST);
            }
            const board: BoardDocument = await this.boardModel.create(dto);
            return board;
        } catch (e) {
            throw new HttpException(e.message, e.status || HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async deleteBoard(dto: DeleteBoardDto): Promise<string> {
        try {
            const { id } = dto;
            const board: BoardDocument = await this.boardModel.findByIdAndDelete(id);
            return board._id;
        } catch (e) {
            throw new HttpException('Board not found', HttpStatus.NOT_FOUND);
        }
    }

    async updateBoard(dto: UpdateBoardDto): Promise<BoardDocument> {
        try {
            const { id, name, description } = dto;
            if (!id) {
                throw new HttpException('Please provide the id', HttpStatus.BAD_REQUEST);
            }
            if (!name && !description) {
                throw new HttpException('Please provide at least one field: name or description', HttpStatus.BAD_REQUEST);
            }
            const board: BoardDocument = await this.boardModel.findById(id);
            const payload = {
                name: name ? name : board.name,
                description: description ? description : board.description
            };
            const updated: BoardDocument = await this.boardModel.findByIdAndUpdate(id, payload, { returnOriginal: false });
            return updated;
        } catch (e) {
            throw new HttpException(e.message, e.status || HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async addTask(dto: AddTaskDto): Promise<TaskDocument> {
        try {
            const { board_id, name, status } = dto;
            if (!board_id || !name || !status) {
                throw new HttpException('Please provide board_id, name and status', HttpStatus.BAD_REQUEST);
            }
            const board: BoardDocument = await this.boardModel.findById(board_id);
            if (!board) {
                throw new HttpException('Board not found', HttpStatus.NOT_FOUND);
            }
            const task: TaskDocument = await this.taskModel.create({ name, status });
            board.tasks.push(task._id);
            await board.save();
            return task;
        } catch (e) {
            throw new HttpException(e.message, e.status || HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
