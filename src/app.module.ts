import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MistralModule } from './mistral/mistral.module';
import { OpenAIModule } from './openai/modules/openai.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    OpenAIModule,
    MistralModule,
  ],
})
export class AppModule {}