import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { MongoIdValidationPipe } from 'src/common/pipes/MongoIdValidationPipe';
import { CreateProductDto } from './dto/create-product.dto';
import { EditProductPartiallyDto } from './dto/edit-partially-product.dto';
import { QueryListAllInterface } from './interface/queryListAll.inteface';
import { ProdutoService } from './produto.service';

@Controller('produto')
export class ProdutoController {

    constructor(private readonly produtoService: ProdutoService) {

    }

    @Get()
    async listAll(@Query() query: QueryListAllInterface = {}) {
        return await this.produtoService.listAll(query)
    }

    @Get('/:id')
    async listOne(@Param('id', MongoIdValidationPipe) id: string) {
        return await this.produtoService.listOne(id)
    }

    @Post()
    @UsePipes(ValidationPipe)
    async create(@Body() createProductDto: CreateProductDto) {
        return await this.produtoService.create(createProductDto)
    }

    @Patch('/:id')
    @UsePipes(ValidationPipe)
    async editPartially(@Param('id', MongoIdValidationPipe) id: string, @Body() editProductDto: EditProductPartiallyDto) {
        return await this.produtoService.editPartially(id, editProductDto)
    }

    @Delete('/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async deleteById(@Param('id', MongoIdValidationPipe) id: string) {
        return await this.produtoService.deleteOne(id)
    }
}