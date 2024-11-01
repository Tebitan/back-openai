import { Transform, TransformFnParams } from "class-transformer";
import { IsAlpha, IsInt, IsNotEmpty, IsOptional, IsPositive, IsString } from "class-validator";

export class TranslateDto{
    @IsString()
    @IsNotEmpty()
    @Transform(({ value }: TransformFnParams) => value?.trim())
    readonly promt:string;

    @IsString()
    @IsNotEmpty()
    @Transform(({ value }: TransformFnParams) => value?.trim())
    readonly lang:string;

    @IsInt()
    @IsPositive()
    @IsOptional()
    readonly maxToken?:number;
}