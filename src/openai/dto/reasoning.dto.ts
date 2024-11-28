import { IsString, IsOptional, IsNumber, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ReasoningDto {
  @ApiProperty()
  @IsString()
  prompt: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  model?: string = 'gpt-4';

  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  temperature?: number = 0.7;

  @ApiProperty({ required: false })
  @IsArray()
  @IsOptional()
  systemPrompts?: string[] = [];
}