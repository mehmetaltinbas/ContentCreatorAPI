import { errorHandler } from '../utilities/ErrorHandler';
import { entities } from '../data/db';
import {
    CreateAudioDto,
    UpdateAudioDto,
    DeleteAudioDto,
} from '../types/dtoTypes/AudioDtoTypes';
import { ResponseBase } from '../types/responseTypes/ResponseBase';
import { GetAllAudiosResponse } from 'responseTypes/AudioResponseTypes';
import { Audio } from '../types/entityTypes/AudioEntityType';
import { Script } from '../types/entityTypes/ScriptEntityType';
import { CreateAudioResponse } from '../types/responseTypes/AudioResponseTypes';

const CreateAsync = errorHandler(async function AudioService_CreateAsync(
    scripts: Script[],
    userId: string,
): Promise<CreateAudioResponse> {
    let audios: Audio[] = [];
    for (const script of scripts) {
        const audio = await entities.Audio.create({
            userId,
        });
        audios.push(audio);
    }
    return { isSuccess: true, message: 'audio created', audios };
});

const GetAllByUserIdAsync = errorHandler(async function AudioService_GetAllByUserIdAsync(
    userId: string,
): Promise<GetAllAudiosResponse> {
    const audios = await entities.Audio.find({ userId });
    if (audios.length === 0)
        return { isSuccess: false, message: 'no audios found for this user' };
    return { isSuccess: true, message: 'audios found', audios };
});

const GetAllByScriptIdAsync = errorHandler(async function AudioService_GetAllByScriptIdAsync(
    scriptId: string,
): Promise<GetAllAudiosResponse> {
    const audios = await entities.Audio.find({ scriptId });
    if (audios.length === 0)
        return { isSuccess: false, message: 'no audios found for this script' };
    return { isSuccess: true, message: 'audios found', audios };
});

const UpdateAsync = errorHandler(async function AudioService_UpdateAsync(
    data: UpdateAudioDto,
): Promise<ResponseBase> {
    const { audioId, userId, ...updateData } = data;
    const updatedAudio = await entities.Audio.findOneAndUpdate(
        { _id: audioId, userId },
        updateData,
        { new: true },
    );
    if (!updatedAudio) return { isSuccess: false, message: "audio couldn't be updated" };
    return { isSuccess: true, message: 'audio updated' };
});

const DeleteAsync = errorHandler(async function AudioService_DeleteAsync(
    data: DeleteAudioDto,
): Promise<ResponseBase> {
    const deletedAudio = await entities.Audio.findOneAndDelete({
        _id: data.audioId,
        userId: data.userId,
    });
    if (!deletedAudio) return { isSuccess: false, message: "audio couldn't be deleted" };
    return { isSuccess: true, message: 'audio deleted' };
});

export default {
    CreateAsync,
    GetAllByUserIdAsync,
    GetAllByScriptIdAsync,
    UpdateAsync,
    DeleteAsync,
};
