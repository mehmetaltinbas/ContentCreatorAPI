import { ResponseBase } from './ResponseBase';
import { Script } from '../entityTypes/ScriptEntityType';

export interface CreateScriptsResponse extends ResponseBase {
    scripts?: Script[];
}

export interface GetAllScriptsResponse extends ResponseBase {
    scripts?: Script[];
}
