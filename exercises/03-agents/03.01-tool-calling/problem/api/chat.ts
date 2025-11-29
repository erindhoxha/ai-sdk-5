import { google } from '@ai-sdk/google';
import {
  convertToModelMessages,
  streamText,
  tool,
  type UIMessage,
} from 'ai';
import * as fsTools from './file-system-functionality.ts';
import z from 'zod';

export const POST = async (req: Request): Promise<Response> => {
  const body: { messages: UIMessage[] } = await req.json();
  const { messages } = body;

  const result = streamText({
    model: google('gemini-2.5-flash'),
    messages: convertToModelMessages(messages),
    system: `
      You are a helpful assistant that can use a sandboxed file system to create, edit and delete files.

      You have access to the following tools:
      - writeFile
      - readFile
      - deletePath
      - listDirectory
      - createDirectory
      - exists
      - searchFiles

      Use these tools to record notes, create todo lists, and edit documents for the user.

      Use markdown files to store information.
    `,
    // TODO: add the tools to the streamText call,
    tools: {
      writeFile: tool({
        description: 'Write to a file',
        inputSchema: z.object({
          path: z
            .string()
            .describe('The path to the file to create'),
          content: z
            .string()
            .describe('The content of the file to create'),
        }),
        execute: async ({ path, content }) => {
          return fsTools.writeFile(path, content);
        },
      }),
    },
    // TODO: add a custom stop condition to the streamText call
    // to force the agent to stop after 10 steps have been taken
    stopWhen: TODO,
  });

  return result.toUIMessageStreamResponse();
};
