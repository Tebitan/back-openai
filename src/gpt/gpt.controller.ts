import { Body, Controller, Post } from '@nestjs/common';
import { GptService } from './gpt.service';
import { OrthographyDto, TranslateDto } from './dtos';

@Controller('gpt')
export class GptController {
  constructor(private readonly gptService: GptService) {}

  @Post('orthography-check')
  orthographyCheck( @Body() body:OrthographyDto){
    return this.gptService.orthographyCheck(body);
  }

  @Post('translate')
  translateText( @Body() body:TranslateDto){
    return this.gptService.translate(body);
  }


}
