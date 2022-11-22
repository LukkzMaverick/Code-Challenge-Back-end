import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { EditProductPartiallyDto } from './dto/edit-partially-product.dto';
import { ProdutoInterface } from './interface/produto.interface';
import { QueryListAllInterface } from './interface/queryListAll.inteface';
import { Produto } from './schemas/produto.schema';
import { messagesProduct } from './util/messagesProduct';

@Injectable()
export class ProdutoService {
    constructor(@InjectModel(Produto.name)
    private readonly produtoModel: Model<ProdutoInterface>) {

    }

    async create(createProductDto: CreateProductDto) {
        let produto = await this.produtoModel.create(createProductDto)
        await produto.save()
        return produto;
    }

    async listOne(_id: string) {
        const produto = await this.produtoModel.findById(_id)
        if (!produto) throw new NotFoundException(messagesProduct.PRODUCT_404)
        return produto
    }

    async listAll(query: QueryListAllInterface) {
        let page = parseInt(query.page)
        let limit = parseInt(query.limit)
        if (!page) page = 1;
        if (!limit) limit = 0;
        const skipIndex = (page - 1) * limit;
        return await this.produtoModel.find()
            .sort({ _id: 1 }).limit(limit).skip(skipIndex)
    }

    async editPartially(_id: string, editProductPartiallyDto: EditProductPartiallyDto) {
        const { matchedCount } = await this.produtoModel.updateOne({ _id },
            { $set: editProductPartiallyDto }
        )
        if (matchedCount < 1) throw new NotFoundException(messagesProduct.PRODUCT_404)
    }

    async deleteOne(_id) {
        const { deletedCount } = await this.produtoModel.deleteOne({ _id })
        if (deletedCount < 1) throw new NotFoundException(messagesProduct.PRODUCT_404)
    }
}
