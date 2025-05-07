import { ResponseBase } from './ResponseBase';
import { Audio } from '../entityTypes/AudioEntityType';

export interface CreateAudioResponse extends ResponseBase {
    audios?: Audio[];
}

export interface GetAllAudiosResponse extends ResponseBase {
    audios?: Audio[];
}
