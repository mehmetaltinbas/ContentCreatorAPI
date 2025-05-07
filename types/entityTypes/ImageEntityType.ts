import mongoose from 'mongoose';

export interface Image {
    _id: unknown;
    userId: mongoose.Schema.Types.ObjectId;
    contentId: mongoose.Schema.Types.ObjectId;
    scriptId: mongoose.Schema.Types.ObjectId;
    boundedScriptText: string;
    sceneNumber: number;
    order: number;
    filePath: string;
    imageUrl: string;
}
