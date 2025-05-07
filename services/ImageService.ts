import { errorHandler } from '../utilities/ErrorHandler';
import { entities } from '../data/db';
import {
    CreateImageDto,
    UpdateImageDto,
    DeleteImageDto,
} from '../types/dtoTypes/ImageDtoTypes';
import { ResponseBase } from '../types/responseTypes/ResponseBase';
import {
    GetAllImagesResponse,
    ImageCreateResponse,
    ImageCompletionResponse,

} from '../types/responseTypes/ImageResponseTypes';
import { Script } from '../types/entityTypes/ScriptEntityType';
import { Image } from '../types/entityTypes/ImageEntityType';
import OpenAIService from './OpenAIService';
import fs from 'fs';
import path from 'path';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const CreateAsync = errorHandler(async function ImageService_CreateAsync(
    scripts: Script[],
    userId: string,
    contentId: string,
    contentNumber: number,
): Promise<ImageCreateResponse> {
    let images: Image[] = [];
    for (const script of scripts) {
        const prompt = `You are a content strategist AI.
        Based on this scriptText: ${script.scriptText};
        Generate image prompts (the prompts that I will give DALL-E to generate an image).
        For each image prompt object, specify for in which sentence(s) of the script the image will be seen in the content and specify the sequence of orders.
        Output should follow the structure of a given json format:
        {
            images: [
                {
                    imagePrompt: ...,
                    boundedScriptText: ...,
                    order: Number,
                },
                {
                    imagePrompt: 2,
                    boundedScriptText: ...
                    order: Number,
                },
                ...
            ]
        }`;
        const completionResponse = await OpenAIService.CompletionAsync<ImageCompletionResponse>(prompt);
        if (!completionResponse.completion || !completionResponse.completion.images) return completionResponse;

        if (process.env.NODE_ENV == 'test') {

            const dummyImagesFolderPath = path.join(process.cwd(), 'dummyData/images');
            for (const image of completionResponse.completion.images) {
                const order = image.order%10;
                const dummyImageBuffer = fs.readFileSync(`${dummyImagesFolderPath}/${order}.jpg`);
                const folderPath = path.join(
                    process.cwd(),
                    `uploads/contents/content${contentNumber}/scene${script.sceneNumber}`,
                );
                const filePath = path.join(folderPath, `${image.order.toString()}.jpg`);
                fs.mkdirSync(folderPath, { recursive: true });
                fs.writeFileSync(filePath, dummyImageBuffer);

                const imageData = {
                    userId,
                    contentId,
                    scriptId: script._id,
                    boundedScriptText: image.boundedScriptText,
                    sceneNumber: script.sceneNumber,
                    order: image.order,
                    filePath,
                };
                const imageRecord = await entities.Image.create(imageData);

                images.push(imageRecord);
            }

        } else {

            for (const image of completionResponse.completion.images) {
                const generateImageResponse = await OpenAIService.GenerateImageAsync(image.imagePrompt);
                if (!generateImageResponse.imageBuffer) {
                    throw new Error('imageBuffer is undefined');
                }
                const folderPath = path.join(
                    process.cwd(),
                    `uploads/contents/content${contentNumber}/scene${script.sceneNumber}`,
                );
                const filePath = path.join(folderPath, image.order.toString());
                fs.mkdirSync(folderPath, { recursive: true });
                fs.writeFileSync(filePath, generateImageResponse.imageBuffer);

                const imageData = {
                    userId,
                    contentId,
                    scriptId: script._id,
                    boundedScriptText: image.boundedScriptText,
                    sceneNumber: script.sceneNumber,
                    order: image.order,
                    filePath,
                };
                const imageRecord = await entities.Image.create(imageData);

                images.push(imageRecord);
            }

        }
    }
    if (!images || images.length == 0) return { isSuccess: false, message: 'images couldnt created' };
    return { isSuccess: true, message: 'images created', images };
});

const GetAllByUserIdAsync = errorHandler(async function ImageService_GetAllByUserIdAsync(
    userId: string,
): Promise<GetAllImagesResponse> {
    const images = await entities.Image.find({ userId });
    if (images.length === 0)
        return { isSuccess: false, message: 'no images found for this user' };
    return { isSuccess: true, message: 'images found', images };
});

const GetAllByScriptIdAsync = errorHandler(async function ImageService_GetAllByScriptIdAsync(
    scriptId: string,
): Promise<GetAllImagesResponse> {
    const images = await entities.Image.find({ scriptId });
    if (images.length === 0)
        return { isSuccess: false, message: 'no images found for this script' };
    return { isSuccess: true, message: 'images found', images };
});

const UpdateAsync = errorHandler(async function ImageService_UpdateAsync(
    data: UpdateImageDto,
): Promise<ResponseBase> {
    const { imageId, userId, ...updateData } = data;
    const updatedImage = await entities.Image.findOneAndUpdate(
        { _id: imageId, userId },
        updateData,
        { new: true },
    );
    if (!updatedImage) return { isSuccess: false, message: "image couldn't be updated" };
    return { isSuccess: true, message: 'image updated' };
});

const DeleteAsync = errorHandler(async function ImageService_DeleteAsync(
    data: DeleteImageDto,
): Promise<ResponseBase> {
    const deletedImage = await entities.Image.findOneAndDelete({
        _id: data.imageId,
        userId: data.userId,
    });
    if (!deletedImage) return { isSuccess: false, message: "image couldn't be deleted" };
    return { isSuccess: true, message: 'image deleted' };
});

export default {
    CreateAsync,
    GetAllByUserIdAsync,
    GetAllByScriptIdAsync,
    UpdateAsync,
    DeleteAsync,
};
