import { IsString } from "class-validator";

export class ImagenVariationDto{
    @IsString()
    readonly baseImage: string;
}