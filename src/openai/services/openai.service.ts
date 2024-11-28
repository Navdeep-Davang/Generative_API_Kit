import { Injectable, Logger } from '@nestjs/common';
import OpenAI from 'openai';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class OpenAIService {
  private readonly openai: OpenAI;
  private readonly logger = new Logger(OpenAIService.name);

  constructor(private configService: ConfigService) {
    this.openai = new OpenAI({
      apiKey: this.configService.get<string>('OPENAI_API_KEY'),
      baseURL: this.configService.get<string>('OPENAI_BASE_URL'),
    });
  }

  async generateCompletion(completionDto: CompletionDto) {
    try {
      const completion = await this.openai.chat.completions.create({
        messages: [{ role: 'user' as const, content: completionDto.prompt }],
        model: completionDto.model || 'gpt-3.5-turbo',
        temperature: completionDto.temperature,
        max_tokens: completionDto.maxTokens,
      });

      return {
        success: true,
        data: completion.choices[0].message.content,
        usage: completion.usage,
      };
    } catch (error) {
      this.logger.error(`OpenAI Completion Error: ${error.message}`);
      throw error;
    }
  }

  async generateImage(imageDto: ImageGenerationDto) {
    try {
      const response = await this.openai.images.generate({
        prompt: imageDto.prompt,
        n: imageDto.n || 1,
        size: imageDto.size || '1024x1024',
      });

      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      this.logger.error(`OpenAI Image Generation Error: ${error.message}`);
      throw error;
    }
  }

  async analyzeImage(visionDto: VisionAnalysisDto) {
    try {
      const messages = [
        {
          role: 'user' as const,
          content: [
            { type: 'text' as const, text: visionDto.prompt },
            {
              type: 'image_url' as const,
              image_url: { url: visionDto.imageUrl },
            },
          ],
        },
      ];

      const response = await this.openai.chat.completions.create({
        model: 'gpt-4-vision-preview',
        messages,
        max_tokens: visionDto.maxTokens || 300,
      });

      return {
        success: true,
        data: response.choices[0].message.content,
        usage: response.usage,
      };
    } catch (error) {
      this.logger.error(`OpenAI Vision Error: ${error.message}`);
      throw error;
    }
  }

  async textToSpeech(audioDto: TextToSpeechDto) {
    try {
      const response = await this.openai.audio.speech.create({
        input: audioDto.input,
        model: audioDto.model || 'tts-1',
        voice: audioDto.voice || 'alloy',
      });

      const buffer = Buffer.from(await response.arrayBuffer());
      return {
        success: true,
        data: buffer.toString('base64'),
        format: 'audio/mp3',
      };
    } catch (error) {
      this.logger.error(`OpenAI Text-to-Speech Error: ${error.message}`);
      throw error;
    }
  }

  async speechToText(speechDto: SpeechToTextDto) {
    try {
      const audioResponse = await fetch(speechDto.audioUrl);
      const audioBlob = await audioResponse.blob();
      
      const audioFile = new File([audioBlob], 'audio.mp3', {
        type: audioBlob.type,
        lastModified: Date.now(),
      });

      const response = await this.openai.audio.transcriptions.create({
        file: audioFile,
        model: speechDto.model || 'whisper-1',
        language: speechDto.language,
      });

      return {
        success: true,
        data: response.text,
      };
    } catch (error) {
      this.logger.error(`OpenAI Speech-to-Text Error: ${error.message}`);
      throw error;
    }
  }

  async generateEmbeddings(input: string) {
    try {
      const response = await this.openai.embeddings.create({
        input,
        model: 'text-embedding-ada-002',
      });

      return {
        success: true,
        data: response.data[0].embedding,
        usage: response.usage,
      };
    } catch (error) {
      this.logger.error(`OpenAI Embeddings Error: ${error.message}`);
      throw error;
    }
  }

  async moderateContent(input: string) {
    try {
      const response = await this.openai.moderations.create({
        input,
      });

      return {
        success: true,
        data: response.results[0],
      };
    } catch (error) {
      this.logger.error(`OpenAI Moderation Error: ${error.message}`);
      throw error;
    }
  }

  async reasoning(reasoningDto: ReasoningDto) {
    try {
      const messages = [
        ...(reasoningDto.systemPrompts?.map(prompt => ({
          role: 'system' as const,
          content: prompt,
        })) || []),
        { role: 'user' as const, content: reasoningDto.prompt },
      ];

      const response = await this.openai.chat.completions.create({
        messages,
        model: reasoningDto.model || 'gpt-4',
        temperature: reasoningDto.temperature || 0.7,
      });

      return {
        success: true,
        data: response.choices[0].message.content,
        usage: response.usage,
      };
    } catch (error) {
      this.logger.error(`OpenAI Reasoning Error: ${error.message}`);
      throw error;
    }
  }
}