import { IsCurrency, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateProductDto {
    @IsNotEmpty()
    @IsString()
    nome: string;

    @IsCurrency()
    preco: string;

    @IsOptional()
    @IsNumber()
    quantidadeEmEstoque?: number;
}