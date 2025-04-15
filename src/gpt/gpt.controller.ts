import type { Response } from 'express';
import { Body, Controller, FileTypeValidator, Get, HttpStatus, MaxFileSizeValidator, Param, ParseFilePipe, ParseIntPipe, Post, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { GptService } from './gpt.service';
import { AudioToTextDto, DicusserDto, ImageGenrationDto, ImagenVariationDto, OrthographyDto, TextToAudioDto, TranslateDto } from './dtos';

@Controller('gpt')
export class GptController {
  constructor(private readonly gptService: GptService) { }

  @Post('orthography-check')
  orthographyCheck(@Body() body: OrthographyDto) {
    return this.gptService.orthographyCheck(body);
  }

  @Post('translate')
  translateText(@Body() body: TranslateDto) {
    return this.gptService.translate(body);
  }

  @Post('text-to-audio')
  async textToAudio(@Body() body: TextToAudioDto, @Res() res: Response) {
    const filePath = await this.gptService.textToAudio(body);
    res.setHeader('Content-Type', 'audio/mp3');
    res.status(HttpStatus.OK);
    res.sendFile(filePath);
  }

  @Get('text-to-audio/:fileID')
  async getAudio(@Param('fileID', ParseIntPipe) fileID: number, @Res() res: Response) {
    const filePath = await this.gptService.getFileById(fileID, 1);
    res.setHeader('Content-Type', 'audio/mp3');
    res.status(HttpStatus.OK);
    res.sendFile(filePath);
  }

  @Post('audio-to-text')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './generated/uploads',
      filename: (req, file, callback) => {
        const fileExtension = file.originalname.split('.').pop();
        const fileName = `${new Date().getTime()}.${fileExtension}`;
        return callback(null, fileName);
      }
    })
  }))
  async audioToText(@UploadedFile(new ParseFilePipe({
    validators: [
      new MaxFileSizeValidator({ maxSize: 1000 * 1024 * 5, message: 'File is bigger than 5 mb' }),
      new FileTypeValidator({ fileType: 'audio/*' })
    ]
  })) file: Express.Multer.File, @Body() body: AudioToTextDto) {
    return this.gptService.audioToText(file, body);
  }

  @Post('imagen-generation')
  async imagenGeneration(@Body() body: ImageGenrationDto) {
    return await this.gptService.imageGeneration(body);
  }

  @Get('imagen-generation/:fileID')
  async getImage(@Param('fileID', ParseIntPipe) fileID: number, @Res() res: Response) {
    const filePath = await this.gptService.getFileById(fileID, 2);
    res.setHeader('Content-Type', 'image/png');
    res.status(HttpStatus.OK);
    res.sendFile(filePath);
  }

  @Post('imagen-variation')
  async imagenVariation(@Body() body: ImagenVariationDto) {
    return await this.gptService.imagenVariation(body);
  }

  @Post('pros-cons-discusser')
  prosConsDicusser(@Body() prosConsDiscusserDto: DicusserDto) {
    return this.gptService.dicusser(prosConsDiscusserDto);
  }

  @Post('pros-cons-discusser-stream')
  async prosConsDicusserStream(@Body() prosConsDiscusserDto: DicusserDto, @Res() res: Response) {
    const stream = await this.gptService.dicusserStream(prosConsDiscusserDto);
    res.setHeader('Content-Type', 'application/json');
    res.status(HttpStatus.OK);
    for await (const chuck of stream) {
      const piece = chuck.choices[0].delta.content || '';
      res.write(piece);
    }
    res.end();
  }

  @Post('extract-text-from-image')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './generated/uploads',
        filename: (req, file, callback) => {
          const fileExtension = file.originalname.split('.').pop();
          const fileName = `${new Date().getTime()}.${fileExtension}`;
          return callback(null, fileName);
        },
      }),
    }),
  )
  async extractTextFromImage(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({
            maxSize: 1000 * 1024 * 5,
            message: 'File is bigger than 5 mb ',
          }),
          new FileTypeValidator({ fileType: 'image/*' }),
        ],
      }),
    )
    file: Express.Multer.File,
    @Body('prompt') prompt: string,
  ) {
    return this.gptService.imageToText(file, prompt);
  }
}
