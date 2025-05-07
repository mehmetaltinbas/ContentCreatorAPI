import dotenv from 'dotenv';
import { errorHandler } from '../utilities/ErrorHandler';
import { ResponseBase } from '../types/responseTypes/ResponseBase';
import PromptService from './PromptService';
import ContentService from './ContentService';
import ScriptService from './ScriptService';
import ImageService from './ImageService';
import AudioService from './AudioService';
import VideoService from './VideoService';

dotenv.config();

const GenerateVideoAsync = errorHandler(
    async function AgentService_GenerateVideoAsync(): Promise<ResponseBase> {
        const stockedVideoCountResponse = await VideoService.GetStockedVideoCountAsync();
        if (stockedVideoCountResponse.count >= 30) {
            return {
                isSuccess: true,
                message: `there are enough videos in stock which is ${stockedVideoCountResponse.count}`,
            };
        }

        const getPromptResponse = await PromptService.GetByIdAsync(
            process.env.PROMPT_ID ?? '',
            process.env.USER_ID ?? '',
        );
        if (!getPromptResponse.prompt) return getPromptResponse;

        const contentCreateResponse = await ContentService.CreateAsync(
            getPromptResponse.prompt,
            process.env.USER_ID ?? '',
        );
        if (!contentCreateResponse.content) return contentCreateResponse;

        // duplication detection logic here

        const scriptCreateResponse = await ScriptService.CreateAsync(
            contentCreateResponse.content,
            process.env.USER_ID ?? '',
        );
        if (!scriptCreateResponse.scripts) return scriptCreateResponse;

        const imageCreateResponse = await ImageService.CreateAsync(
            scriptCreateResponse.scripts,
            process.env.USER_ID ?? '',
            contentCreateResponse.content._id as string,
            contentCreateResponse.content.contentNumber
        );
        if (!imageCreateResponse.images) return imageCreateResponse;

        const audioCreateResponse = await AudioService.CreateAsync(
            scriptCreateResponse.scripts,
            process.env.USER_ID ?? '',
        );
        if (!audioCreateResponse.audios) return audioCreateResponse;

        const videoCreateResponse = await VideoService.CreateAsync(
            imageCreateResponse.images,
            audioCreateResponse.audios,
            process.env.USER_ID ?? '',
        );
        if (!videoCreateResponse.video) return videoCreateResponse;

        return { isSuccess: true, message: 'video generated and scheduled' };
    },
);

export default {
    GenerateVideoAsync,
};
