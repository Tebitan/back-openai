import { IsNotEmpty, IsString } from "class-validator";
import { Transform, TransformFnParams } from "class-transformer";

export class DicusserDto {
    @IsString()
    @IsNotEmpty()
    @Transform(({ value }: TransformFnParams) => value?.trim())
    readonly prompt: string;
}