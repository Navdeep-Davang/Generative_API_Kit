import { z } from 'zod';

// DTO for the options that will be passed to waitForProcessing function
export const WaitForProcessingOptionsSchema = z.object({
  pollInterval: z.number().optional().default(5000),  // Default to 5000ms if not provided
  maxWait: z.number().optional().default(30 * 60 * 1000),  // Default to 30 minutes if not provided
});
