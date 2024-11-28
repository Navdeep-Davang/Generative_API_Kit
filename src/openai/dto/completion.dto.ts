import { IsString, IsOptional, IsNumber, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CompletionDto {
  @ApiProperty()
  @IsString()
  prompt: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  model?: string = 'gpt-3.5-turbo';

  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  temperature?: number = 0.7;

  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  maxTokens?: number = 150;
}