import { IsCurrency, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class EditProductPartiallyDto {
    @IsNotEmpty()
    @IsString()
    @IsOptional()
    nome: string;

    @IsOptional()
    @IsCurrency()
    preco: string;

    @IsOptional()
    @IsNumber()
    quantidadeEmEstoque?: number;
}