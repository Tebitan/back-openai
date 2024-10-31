import { Transform, TransformFnParams } from "class-transformer";
import { IsInt, IsNotEmpty, IsOptional, IsPositive, IsString } from "class-validator";

export class OrthographyDto{
    @IsString()
    @IsNotEmpty()
    @Transform(({ value }: TransformFnParams) => value?.trim())
    readonly promt:string;

    @IsInt()
    @IsPositive()
    @IsOptional()
    readonly maxToken?:number;
}