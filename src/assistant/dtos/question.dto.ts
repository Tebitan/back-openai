import { IsNotEmpty, IsString } from "class-validator";
import { Transform, TransformFnParams } from "class-transformer";

export class QuestionDto {
    @IsString()
    @IsNotEmpty()
    @Transform(({ value }: TransformFnParams) => value?.trim())
    readonly threadId: string;

    @IsString()
    @IsNotEmpty()
    @Transform(({ value }: TransformFnParams) => value?.trim())
    readonly question: string;
}