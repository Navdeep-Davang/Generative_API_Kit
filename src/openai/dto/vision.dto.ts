import { IsString, IsOptional, IsNumber, IsUrl } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class VisionAnalysisDto {
  @ApiProperty()
  @IsString()
  prompt: string;

  @ApiProperty()
  @IsUrl()
  imageUrl: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  model?: string = 'gpt-4-vision-preview';

  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  maxTokens?: number = 300;
}