import { ResponseBase } from './ResponseBase';
import { Video } from '../entityTypes/VideoEntityType';

export interface CreateVideoResponse extends ResponseBase {
    video: Video;
}

export interface GetAllVideosResponse extends ResponseBase {
    videos?: Video[];
}

export interface StockedVideoCountResponse extends ResponseBase {
    count: number;
}
