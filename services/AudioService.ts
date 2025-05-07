import { errorHandler } from '../utilities/ErrorHandler';
import axios from 'axios';
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
import fs from 'fs';
import path from 'path';

const CreateAsync = errorHandler(async function AudioService_CreateAsync(
    scripts: Script[],
    userId: string,
    contentId: string,
    contentNumber: number
): Promise<CreateAudioResponse> {
    let audios: Audio[] = [];
    const url = `https://api.elevenlabs.io/v1/text-to-speech/${process.env.ELEVENLABS_VOICE_ID}`;
    const requestBody = {
        "text": '',
        "voice_settings": {
          "stability": 0.5,
          "similarity_boost": 0.5
       }
    };
    for (const script of scripts) {
        requestBody.text = script.scriptText;
        const response = await axios.post(
            url,
            requestBody,
            {
                headers: {
                    'xi-api-key': process.env.ELEVENLABS_API_KEY,
                    'Content-Type': 'application/json',
                    'Accept': 'audio/mpeg'
                },
                responseType: 'arraybuffer'
            }
        );

        const folderPath = path.join(process.cwd(), `uploads/contents/content${contentNumber}/audios`);
        if (!fs.existsSync(folderPath)) fs.mkdirSync(folderPath);
        const filePath = path.join(folderPath, `${script.sceneNumber}.mp3`);
        fs.writeFileSync(filePath, response.data as Buffer);

        const audio = await entities.Audio.create({
            userId,
            scriptId: script._id,
            contentId,
            sceneNumber: script.sceneNumber,
            filePath
        });
        audios.push(audio);
    }
    if (!audios || audios.length == 0) return { isSuccess: false, message: 'audios couldnt created' };
    return { isSuccess: true, message: 'audios created', audios };
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
