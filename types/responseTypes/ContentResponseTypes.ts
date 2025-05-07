import { ResponseBase } from './ResponseBase';
import { Content } from '../entityTypes/ContentEntityType';

export interface CreateContentResponse extends ResponseBase {
    content?: Content;
}

export interface GetAllContentsResponse extends ResponseBase {
    contents?: Content[];
}

export interface GetContentResponse extends ResponseBase {
    content?: Content;
}
