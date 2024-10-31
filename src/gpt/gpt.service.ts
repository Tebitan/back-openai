import { Injectable } from '@nestjs/common';
import { orthographyChechUseCase } from './use-cases';
import { OrthographyDto } from './dtos';
import OpenAI from 'openai';

@Injectable()
export class GptService {

    private openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY})

    async orthographyCheck(orthographyDto: OrthographyDto) {
        return await orthographyChechUseCase(this.openai,{ prompt: orthographyDto.promt });
    }
}
