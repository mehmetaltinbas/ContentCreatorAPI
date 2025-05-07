import { errorHandler } from '../utilities/ErrorHandler';
import { entities } from '../data/db';
import {
    CreateContentResponse,
    GetAllContentsResponse,
    GetContentResponse,
} from 'responseTypes/ContentResponseTypes';
import { ResponseBase } from 'responseTypes/ResponseBase';
import OpenAIService from './OpenAIService';
import { Prompt } from 'entityTypes/PromptEntityType';
import { Content } from '../types/entityTypes/ContentEntityType';

const CreateAsync = errorHandler(async function ContentService_CreateAsync(
    prompt: Prompt,
    userId: string,
): Promise<CreateContentResponse> {
    const instruction = `You are a content strategist AI.
    Based on this information: niche: ${prompt.niche}, description: ${prompt.description}, minVideoDuration: ${prompt.minVideoDuration}, maxVideoDuration: ${prompt.maxVideoDuration};
    Generate a YouTube content overview, output should follow the structure of a given ContentDocument in json format:
    ContentDocument (output json format):
    {
    "title": "Catchy YouTube video title based on prompt",
    "description": "Engaging video content overview",
    "tags": ["relevant", "SEO-friendly", "short", "niche-specific"],
    "scenesCount": estimated number of scenes based on video duration and niche
    }`;
    const completionResponse = await OpenAIService.CompletionAsync<Content>(instruction);
    if (!completionResponse.completion) return completionResponse;
    const contentsResponse = await GetAllByUserIdAsync(userId);
    if (!contentsResponse.contents)
        return { isSuccess: false, message: "content couldn't created" };
    const contentNumber = contentsResponse.contents?.length + 1;
    const averageSceneDuration =
        (prompt.minVideoDuration + prompt.maxVideoDuration) /
        2 /
        completionResponse.completion?.scenesCount;
    const contentData = {
        ...completionResponse.completion,
        userId,
        promptId: prompt._id,
        contentNumber,
        averageSceneDuration,
        isPublished: false,
    };
    const content = await entities.Content.create(contentData);
    if (!content) return { isSuccess: false, message: "content couldn't created" };
    return { isSuccess: true, message: 'content created', content };
});

const GetAllByUserIdAsync = errorHandler(async function ContentService_GetAllByUserIdAsync(
    userId: string,
): Promise<GetAllContentsResponse> {
    const contents = await entities.Content.find({ userId });
    if (contents.length == 0) return { isSuccess: false, message: "contents couldn't find" };
    return { isSuccess: true, message: 'contents found', contents };
});

const GetByIdAsync = errorHandler(async function ContentService_GetByIdAsync(
    contentId: string,
): Promise<GetContentResponse> {
    const content = await entities.Content.findById(contentId);
    if (!content) return { isSuccess: false, message: "content couldn't find" };
    return { isSuccess: true, message: 'content found', content };
});

export default {
    CreateAsync,
    GetAllByUserIdAsync,
    GetByIdAsync,
};
