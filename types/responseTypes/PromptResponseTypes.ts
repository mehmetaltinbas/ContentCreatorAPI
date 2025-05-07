import { ResponseBase } from './ResponseBase';
import { Prompt } from '../entityTypes/PromptEntityType';

export interface GetAllPromptsResponse extends ResponseBase {
    prompts?: Prompt[];
}

export interface GetPromptResponse extends ResponseBase {
    prompt?: Prompt;
}
