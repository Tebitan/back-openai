import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GptModule } from './gpt/gpt.module';
import { AssistantModule } from './assistant/assistant.module';

@Module({
  imports: [ConfigModule.forRoot(),GptModule, AssistantModule,],
  controllers: [],
  providers: [],
})
export class AppModule {}
