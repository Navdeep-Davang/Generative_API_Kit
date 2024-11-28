import { IsString, IsOptional, IsNumber, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

enum ImageSize {
  SMALL = '256x256',
  MEDIUM = '512x512',
  LARGE = '1024x1024',
}

export class ImageGenerationDto {
  @ApiProperty()
  @IsString()
  prompt: string;

  @ApiProperty({ enum: ImageSize, default: ImageSize.LARGE })
  @IsEnum(ImageSize)
  @IsOptional()
  size?: ImageSize = ImageSize.LARGE;

  @ApiProperty({ required: false, default: 1 })
  @IsNumber()
  @IsOptional()
  n?: number = 1;
}