import { errorHandler } from '../utilities/ErrorHandler';
import { entities } from '../data/db';
import {
    CreateScriptDto,
    UpdateScriptDto,
    DeleteScriptDto,
} from '../types/dtoTypes/ScriptDtoTypes';
import { ResponseBase } from '../types/responseTypes/ResponseBase';
import OpenAIService from './OpenAIService';
import {
    GetAllScriptsResponse,
    CreateScriptsResponse,
} from 'responseTypes/ScriptResponseTypes';
import { Content } from '../types/entityTypes/ContentEntityType';
import { Script } from '../types/entityTypes/ScriptEntityType';

const CreateAsync = errorHandler(async function ScriptService_CreateAsync(
    content: Content,
    userId: string,
): Promise<CreateScriptsResponse> {
    let scripts: Script[] = [];
    const instruction = `You are a content strategist AI.
    Based on this information: title: ${content.title}, description: ${content.description}, scenesCount: ${content.scenesCount}, averageSceneDuration: ${content.averageSceneDuration};
    Generate ${content.scenesCount} number (sceneCount) of scripts, each script is what the vocalizer will read in that scene.
    For each script when vocalizer read that script it will averagely take ${content.averageSceneDuration} seconds to read.
    Output should follow the structure of a given json format:
    {
        scripts: [
            {
                sceneNumber: 1,
                scriptText: ...
            },
            {
                sceneNumber: 2,
                scriptText: ...
            },
            ...
        ]
    }`;
    const completionResponse =
        await OpenAIService.CompletionAsync<GetAllScriptsResponse>(instruction);
    if (!completionResponse.completion || !completionResponse.completion.scripts)
        return { isSuccess: false, message: "scripts couldn't created" };
    for (const script of completionResponse.completion.scripts) {
        const scriptData = {
            ...script,
            userId,
            contentId: content._id,
        };
        const scriptRecord = await entities.Script.create(scriptData);
        scripts.push(scriptRecord);
    }
    return { isSuccess: true, message: 'script created', scripts };
});

const GetAllByUserIdAsync = errorHandler(async function ScriptService_GetAllByUserIdAsync(
    userId: string,
): Promise<GetAllScriptsResponse> {
    const scripts = await entities.Script.find({ userId });
    if (scripts.length === 0)
        return { isSuccess: false, message: 'no scripts found for this user' };
    return { isSuccess: true, message: 'scripts found', scripts };
});

const GetAllByContentId = errorHandler(async function ScriptService_GetAllByContentId(
    contentId: string,
): Promise<GetAllScriptsResponse> {
    const scripts = await entities.Script.find({ contentId });
    if (scripts.length === 0)
        return { isSuccess: false, message: 'no scripts found for this prompt' };
    return { isSuccess: true, message: 'scripts found', scripts };
});

const UpdateAsync = errorHandler(async function ScriptService_UpdateAsync(
    data: UpdateScriptDto,
): Promise<ResponseBase> {
    const { scriptId, userId, ...updateData } = data;
    const updatedScript = await entities.Script.findOneAndUpdate(
        { _id: scriptId, userId },
        updateData,
        { new: true },
    );
    if (!updatedScript) return { isSuccess: false, message: "script couldn't be updated" };
    return { isSuccess: true, message: 'script updated' };
});

const DeleteAsync = errorHandler(async function ScriptService_DeleteAsync(
    data: DeleteScriptDto,
): Promise<ResponseBase> {
    const deletedScript = await entities.Script.findOneAndDelete({
        _id: data.scriptId,
        userId: data.userId,
    });
    if (!deletedScript) return { isSuccess: false, message: "script couldn't be deleted" };
    return { isSuccess: true, message: 'script deleted' };
});

export default {
    CreateAsync,
    GetAllByUserIdAsync,
    GetAllByContentId,
    UpdateAsync,
    DeleteAsync,
};
