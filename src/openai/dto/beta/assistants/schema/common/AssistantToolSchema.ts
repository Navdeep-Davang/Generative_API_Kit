import { z } from "zod";

export const AssistantToolSchema = z.union([
    z.object({ type: z.literal('code_interpreter') }),
    z.object({
      type: z.literal('file_search'),
      file_search: z
        .object({
          max_num_results: z.number().min(1).max(50).optional(),
          ranking_options: z
            .object({
              score_threshold: z.number().min(0).max(1),
              ranker: z.union([z.literal('auto'), z.literal('default_2024_08_21')])
                .optional(),
            })
            .optional(),
        })
        .optional(),
    }),
    z.object({
      type: z.literal('function'),
      function: z.object({
        name: z.string().max(64),
        description: z.string().optional(),
        parameters: z.record(z.string(), z.any()).optional(),
        strict: z.boolean().nullable().optional(),
      }),
    }),
  ]);
  