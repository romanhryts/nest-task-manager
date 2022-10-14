import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { BoardService } from './board.service';
import { BoardDocument } from './schemas/board.schema';
import { CreateBoardDto } from './dto/create-board.dto';
import { DeleteBoardDto } from './dto/delete-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';

@Controller('boards')
export class BoardController {
    constructor(private boardService: BoardService) {
    }

    @Get(':id')
    async getAll(@Param('id') id: string): Promise<BoardDocument[]> {
        return this.boardService.getAll(id);
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
}
