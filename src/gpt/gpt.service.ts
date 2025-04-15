import { Injectable, NotFoundException } from '@nestjs/common';
import OpenAI from 'openai';
import { orthographyChechUseCase, textToAudioUseCase, translateUseCase, getAudioByIdUseCase, audioToTextUseCase, imageGenerationUseCase, getImageByIdUseCase, imageVariationUseCase, dicusserUseCase, dicusserStreamUseCase, imageToTextUseCase } from './use-cases';
import { AudioToTextDto, DicusserDto, ImageGenrationDto, ImagenVariationDto, OrthographyDto, TextToAudioDto, TranslateDto } from './dtos';

@Injectable()
export class GptService {
    private openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

    async orthographyCheck(orthographyDto: OrthographyDto) {
        return await orthographyChechUseCase(this.openai, { prompt: orthographyDto.promt });
    }

    async translate(translateDto: TranslateDto) {
        return await translateUseCase(this.openai, { prompt: translateDto.promt, lang: translateDto.lang });
    }

    async textToAudio(textToAudioDto: TextToAudioDto) {
        return await textToAudioUseCase(this.openai, { prompt: textToAudioDto.promt, voice: textToAudioDto.voice })
    }

    async getFileById(fileId: number, typeFile: number) {
        const filePath: string = typeFile == 1 ? await getAudioByIdUseCase(fileId) : await getImageByIdUseCase(fileId);
        if (filePath.length == 0) throw new NotFoundException(`File with ID ${fileId} not found`);
        return filePath;
    }

    async audioToText(audioFile: Express.Multer.File, audioToTextDto: AudioToTextDto) {
        return await audioToTextUseCase(this.openai, { audioFile, prompt: audioToTextDto.prompt });
    }

    async imageGeneration(imageGenrationDto: ImageGenrationDto) {
        return await imageGenerationUseCase(this.openai, { prompt: imageGenrationDto.prompt, originalImage: imageGenrationDto.originalImage, maskImage: imageGenrationDto.maskImage });
    }

    async imagenVariation(imagenVariationDto: ImagenVariationDto) {
        return await imageVariationUseCase(this.openai, { baseImage: imagenVariationDto.baseImage });
    }

    async dicusser({ prompt }: DicusserDto) {
        return await dicusserUseCase(this.openai, { prompt });
    }

    async dicusserStream({ prompt }: DicusserDto) {
        return await dicusserStreamUseCase(this.openai, { prompt });
    }

    async imageToText(imageFile:Express.Multer.File, prompt: string){
        return await imageToTextUseCase(this.openai, { imageFile, prompt });
    }
}
