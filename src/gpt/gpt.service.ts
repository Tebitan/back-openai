import { Injectable, NotFoundException } from '@nestjs/common';
import OpenAI from 'openai';
import { orthographyChechUseCase, textToAudioUseCase, translateUseCase, getAudioByIdUseCase, audioToTextUseCase } from './use-cases';
import { AudioToTextDto, OrthographyDto, TextToAudioDto, TranslateDto } from './dtos';

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

    async getAudioById(fileId: number) {
        const filePath: string = await getAudioByIdUseCase(fileId);
        if (filePath.length == 0) throw new NotFoundException(`File with ID ${fileId} not found`);
        return filePath;
    }

    async audioToText(audioFile: Express.Multer.File, audioToTextDto:AudioToTextDto) {
        return await audioToTextUseCase(this.openai, { audioFile,prompt: audioToTextDto.prompt });
    }
}
