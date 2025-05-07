import OpenAI from 'openai';
import dotenv from 'dotenv';
import { errorHandler } from '../utilities/ErrorHandler';
import { ResponseBase } from '../types/responseTypes/ResponseBase';
import { 
    CompletionResponse,
    GenerateImageResponse
} from '../types/responseTypes/OpenAIResponseTypes';

dotenv.config();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const CompletionAsync = errorHandler(async function OpenAIService_ChatCompletionAsync<
    T = unknown,
>(instruction: string): Promise<CompletionResponse<T>> {
    const response = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
            {
                role: 'user',
                content: instruction,
            },
        ],
        response_format: { type: 'json_object' },
    });
    const rawContent = response.choices[0].message.content;
    if (!rawContent) return { isSuccess: false, message: 'completion failed' };
    const completion = JSON.parse(rawContent) as T;
    if (!response.choices[0].message.content)
        return { isSuccess: false, message: 'completion failed' };
    return {
        isSuccess: true,
        message: 'completion is done',
        completion,
    };
});

const GenerateImageAsync = errorHandler(async function OpenAIService_GenerateImageAsync(
    prompt: string
): Promise<GenerateImageResponse> {
    if (!prompt) throw new Error("prompt can't be empty");
    const response = await openai.images.generate({
        model: 'dall-e-2',
        prompt,
        n: 1,
        size: '1792x1024',
        response_format: 'b64_json',
    });
    let buffer: Buffer;
    const base64Image = response.data[0].b64_json;
    if (base64Image) {
        buffer = Buffer.from(base64Image, 'base64');
    } else {
        throw new Error('Image data is undefined');
    }

    return {
        isSuccess: true,
        message: 'image generation done',
        imageBuffer: buffer
    };
});

export default {
    CompletionAsync,
    GenerateImageAsync,
};
