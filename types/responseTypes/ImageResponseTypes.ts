import { ResponseBase } from './ResponseBase';
import { Image } from '../entityTypes/ImageEntityType';

export interface GetAllImagesResponse extends ResponseBase {
    images?: Image[];
}

export interface ImageCreateResponse extends ResponseBase {
    images?: Image[];
}

export interface ImageCompletionResponse extends ResponseBase {
    images?: ImageCompletion[];
}

interface ImageCompletion {
    imagePrompt: string;
    boundedScriptText: string;
    order: number,
}