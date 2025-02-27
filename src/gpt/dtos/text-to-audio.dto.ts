import { Transform, TransformFnParams } from "class-transformer";
import { IsInt, IsNotEmpty, IsOptional, IsPositive, IsString } from "class-validator";

export class TextToAudioDto{
    @IsString()
    @IsNotEmpty()
    @Transform(({ value }: TransformFnParams) => value?.trim())
    readonly promt:string;

    @IsString()
    @IsOptional()
    readonly voice?:string;

    @IsInt()
    @IsPositive()
    @IsOptional()
    readonly maxToken?:number;
}