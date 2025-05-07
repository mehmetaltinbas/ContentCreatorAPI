import { errorHandler } from '../utilities/ErrorHandler';
import { entities } from '../data/db';
import {
    CreatePromptDto,
    UpdatePromptDto,
    DeletePromptDto,
} from '../types/dtoTypes/PromptDtoTypes';
import { ResponseBase } from '../types/responseTypes/ResponseBase';
import { GetAllPromptsResponse, GetPromptResponse } from 'responseTypes/PromptResponseTypes';

const CreateAsync = errorHandler(async function PromptService_CreateAsync(
    data: CreatePromptDto,
): Promise<ResponseBase> {
    await entities.Prompt.create(data);
    return { isSuccess: true, message: 'prompt created' };
});

const GetAllByUserIdAsync = errorHandler(async function PromptService_GetAllByUserIdAsync(
    userId: string,
): Promise<GetAllPromptsResponse> {
    const prompts = await entities.Prompt.find({ userId });
    if (prompts.length == 0)
        return {
            isSuccess: false,
            message: 'there are no prompts associated with given userId',
        };
    return { isSuccess: true, message: 'prompt(s) found', prompts };
});

const GetByIdAsync = errorHandler(async function PromptService_GetByIdAsync(
    promptId: string,
    userId: string,
): Promise<GetPromptResponse> {
    const prompt = await entities.Prompt.findOne({
        _id: promptId,
        userId,
    });
    if (!prompt) return { isSuccess: false, message: "prompt couldn't find" };
    return { isSuccess: true, message: 'prompt found', prompt };
});

const UpdateAsync = errorHandler(async function PromptService_UpdateAsync(
    data: UpdatePromptDto,
): Promise<ResponseBase> {
    console.log(data);
    const { promptId, userId, ...promptData } = data;
    const updatedPrompt = await entities.Prompt.findOneAndUpdate(
        { _id: promptId, userId },
        promptData,
        { new: true },
    );
    if (!updatedPrompt) return { isSuccess: false, message: "prompt coldn't updated" };
    return { isSuccess: true, message: 'prompt updated' };
});

const DeleteAsync = errorHandler(async function PromptService_DeleteAsync(
    data: DeletePromptDto,
): Promise<ResponseBase> {
    const deletedPrompt = await entities.Prompt.findOneAndDelete({
        _id: data.promptId,
        userId: data.userId,
    });
    if (!deletedPrompt) return { isSuccess: false, message: "prompt couldn't deleted" };
    return { isSuccess: true, message: 'prompt deleted' };
});

export default {
    CreateAsync,
    GetAllByUserIdAsync,
    GetByIdAsync,
    UpdateAsync,
    DeleteAsync,
};
