import { IsString, IsOptional, IsNumber, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum VoiceModel {
  ALLOY = 'alloy',
  ECHO = 'echo',
  FABLE = 'fable',
  ONYX = 'onyx',
  NOVA = 'nova',
  SHIMMER = 'shimmer',
}

export class TextToSpeechDto {
  @ApiProperty()
  @IsString()
  input: string;

  @ApiProperty({ enum: VoiceModel, default: VoiceModel.ALLOY })
  @IsEnum(VoiceModel)
  @IsOptional()
  voice?: VoiceModel = VoiceModel.ALLOY;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  model?: string = 'tts-1';
}

export class SpeechToTextDto {
  @ApiProperty()
  @IsString()
  audioUrl: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  model?: string = 'whisper-1';

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  language?: string;
}