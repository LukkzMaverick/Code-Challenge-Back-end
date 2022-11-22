import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ProdutoDocument = HydratedDocument<Produto>;

@Schema()
export class Produto {
    @Prop({ required: true })
    nome: string;

    @Prop({ default: 0 })
    quantidadeEmEstoque: number;

    @Prop({ required: true })
    preco: string;
}

export const ProdutoSchema = SchemaFactory.createForClass(Produto);