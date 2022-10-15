import { Body, Controller, Delete, Get, Param, Post, Put, Req } from '@nestjs/common';
import { BoardService } from './board.service';
import { BoardDocument } from './schemas/board.schema';
import { CreateBoardDto } from './dto/create-board.dto';
import { DeleteBoardDto } from './dto/delete-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { AddTaskDto } from './dto/add-task.dto';
import { TaskDocument } from './schemas/task.schema';
import { DeleteTaskDto } from './dto/delete-task.dto';
import { Request } from 'express';

@Controller('boards')
export class BoardController {
    constructor(private boardService: BoardService) {
    }

    @Get()
    async getAll(@Req() request: Request): Promise<BoardDocument[]> {
        return this.boardService.getAll(request);
    }

    @Get('/:id')
    async getOneBoard(@Param('id') id: string): Promise<BoardDocument> {
        return this.boardService.getOneBoard(id);
    }

    @Post()
    async addBoard(@Body() dto: CreateBoardDto): Promise<BoardDocument> {
        return this.boardService.addBoard(dto);
    }

    @Delete()
    async deleteBoard(@Body() dto: DeleteBoardDto): Promise<string> {
        return this.boardService.deleteBoard(dto);
    }

    @Put()
    async updateBoard(@Body() dto: UpdateBoardDto): Promise<BoardDocument> {
        return this.boardService.updateBoard(dto);
    }

    @Post('/task')
    async addTask(@Body() dto: AddTaskDto): Promise<TaskDocument> {
        return this.boardService.addTask(dto);
    }

    @Delete('/task')
    async deleteTask(@Body() dto: DeleteTaskDto): Promise<string> {
        return this.boardService.deleteTask(dto);
    }
}
