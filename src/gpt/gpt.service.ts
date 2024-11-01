import { Injectable } from '@nestjs/common';
import { orthographyChechUseCase, translateUseCase } from './use-cases';
import { OrthographyDto, TranslateDto } from './dtos';
import OpenAI from 'openai';

@Injectable()
export class GptService {

    private openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

    async orthographyCheck(orthographyDto: OrthographyDto) {
        return await orthographyChechUseCase(this.openai, { prompt: orthographyDto.promt });
    }

    async translate(translateDto: TranslateDto) {
        return await translateUseCase(this.openai, { prompt: translateDto.promt, lang: translateDto.lang });
    }
}
