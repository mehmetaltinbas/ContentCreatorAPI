import { ResponseBase } from './ResponseBase';

export interface CompletionResponse<T = unknown> extends ResponseBase {
    completion?: T;
}

export interface GenerateImageResponse extends ResponseBase {
    imageBuffer?: Buffer,
}