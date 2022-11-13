import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Req } from '@nestjs/common';
import { BoardService } from './board.service';
import { BoardDocument } from './schemas/board.schema';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { AddTaskDto } from './dto/add-task.dto';
import { TaskDocument } from './schemas/task.schema';
import { DeleteTaskDto } from './dto/delete-task.dto';
import { Request } from 'express';
import { UpdateTaskDto } from './dto/update-task.dto';
import { CommentDto } from './dto/comment.dto';

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

    @Delete('/:id')
    async deleteBoard(@Param('id') id: string): Promise<string> {
        return this.boardService.deleteBoard(id);
    }

    @Put()
    async updateBoard(@Body() dto: UpdateBoardDto): Promise<BoardDocument> {
        return this.boardService.updateBoard(dto);
    }

    @Post('/task')
    async addTask(@Body() dto: AddTaskDto): Promise<TaskDocument> {
        return this.boardService.addTask(dto);
    }

    @Delete('/:boardId/task/:id')
    async deleteTask(@Param('id') id: string, @Param('boardId') board_id: string): Promise<string> {
        const dto: DeleteTaskDto = { id, board_id };
        return this.boardService.deleteTask(dto);
    }

    @Put('/task')
    async updateTask(@Body() dto: UpdateTaskDto): Promise<TaskDocument> {
        return this.boardService.updateTask(dto);
    }

    @Post('/task/comment')
    async addComment(@Body() dto: CommentDto): Promise<TaskDocument> {
        return this.boardService.addComment(dto);
    }

    @Delete('/task/:taskId/comment/:text')
    async deleteComment(
        @Param('text') comment: string,
        @Param('taskId') task_id: string
    ): Promise<TaskDocument> {
        const dto: CommentDto = {task_id, comment}
        return this.boardService.deleteComment(dto);
    }

    @Patch('/:id/')
    async changeColorType(@Param('id') id: string, @Body() dto: {field: string, value: string}): Promise<string> {
        return this.boardService.changeColor(id, dto);
    }
}
