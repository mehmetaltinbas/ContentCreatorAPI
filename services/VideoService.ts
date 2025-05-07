import { errorHandler } from '../utilities/ErrorHandler';
import { entities } from '../data/db';
import {
    CreateVideoDto,
    UpdateVideoDto,
    DeleteVideoDto,
} from '../types/dtoTypes/VideoDtoTypes';
import { ResponseBase } from '../types/responseTypes/ResponseBase';
import {
    CreateVideoResponse,
    GetAllVideosResponse,
    StockedVideoCountResponse,
} from '../types/responseTypes/VideoResponseTypes';
import { Image } from '../types/entityTypes/ImageEntityType';
import { Audio } from '../types/entityTypes/AudioEntityType';

const CreateAsync = errorHandler(async function VideoService_CreateAsync(
    images: Image[],
    audios: Audio[],
    userId: string,
): Promise<CreateVideoResponse> {
    const video = await entities.Video.create({
        userId,
    });
    return { isSuccess: true, message: 'video created', video };
});

const GetAllByUserIdAsync = errorHandler(async function VideoService_GetAllByUserIdAsync(
    userId: string,
): Promise<GetAllVideosResponse> {
    const videos = await entities.Video.find({ userId });
    if (videos.length === 0)
        return { isSuccess: false, message: 'no videos found for this user' };
    return { isSuccess: true, message: 'videos found', videos };
});

const GetAllByScriptIdAsync = errorHandler(async function VideoService_GetAllByScriptIdAsync(
    scriptId: string,
): Promise<GetAllVideosResponse> {
    const videos = await entities.Video.find({ scriptId });
    if (videos.length === 0)
        return { isSuccess: false, message: 'no videos found for this script' };
    return { isSuccess: true, message: 'videos found', videos };
});

const GetStockedVideoCountAsync = errorHandler(
    async function VideoService_GetStockedVideoCountAsync(): Promise<StockedVideoCountResponse> {
        const stockedVideos = await entities.Video.find({
            isPublished: false,
        });
        return {
            isSuccess: true,
            message: 'stocked videos count determined',
            count: stockedVideos.length,
        };
    },
);

const UpdateAsync = errorHandler(async function VideoService_UpdateAsync(
    data: UpdateVideoDto,
): Promise<ResponseBase> {
    const { videoId, userId, ...updateData } = data;
    const updatedVideo = await entities.Video.findOneAndUpdate(
        { _id: videoId, userId },
        updateData,
        { new: true },
    );
    if (!updatedVideo) return { isSuccess: false, message: "video couldn't be updated" };
    return { isSuccess: true, message: 'video updated' };
});

const DeleteAsync = errorHandler(async function VideoService_DeleteAsync(
    data: DeleteVideoDto,
): Promise<ResponseBase> {
    const deletedVideo = await entities.Video.findOneAndDelete({
        _id: data.videoId,
        userId: data.userId,
    });
    if (!deletedVideo) return { isSuccess: false, message: "video couldn't be deleted" };
    return { isSuccess: true, message: 'video deleted' };
});

export default {
    CreateAsync,
    GetAllByUserIdAsync,
    GetAllByScriptIdAsync,
    GetStockedVideoCountAsync,
    UpdateAsync,
    DeleteAsync,
};
