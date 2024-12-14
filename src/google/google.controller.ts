import { Controller, Post, Body } from '@nestjs/common';
import { GoogleService } from './google.service';

@Controller('google')
export class GoogleController {
  constructor(private readonly googleService: GoogleService) {}

  @Post('generate-content')
  async generateContent(@Body() body: { prompt: string; imagePath: string }): Promise<{ response: string }> {
    const response = await this.googleService.generateContent(body.prompt, body.imagePath);
    return { response };
  }
}
