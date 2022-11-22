import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProdutoController } from './produto.controller';
import { ProdutoService } from './produto.service';
import { Produto, ProdutoSchema } from './schemas/produto.schema';

@Module({
  imports: [MongooseModule.forFeature([
    { name: Produto.name, schema: ProdutoSchema },
  ])],
  controllers: [ProdutoController],
  providers: [ProdutoService]
})
export class ProdutoModule { }
