import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Transform, TransformFnParams } from "class-transformer";

export class ImageGenrationDto{
        @IsString()
        @IsNotEmpty()
        @Transform(({ value }: TransformFnParams) => value?.trim())
        readonly prompt: string;
        
        @IsString()
        @IsOptional()
        readonly originalImage?: string;

        @IsString()
        @IsOptional()
        readonly maskImage?: string;
}