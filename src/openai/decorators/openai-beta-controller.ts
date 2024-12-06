import { Controller, applyDecorators } from '@nestjs/common';

export function BetaController(path: string) {
  // Prepend 'openai' to the path dynamically
  return applyDecorators(Controller(`openai/beta/${path}`));
}