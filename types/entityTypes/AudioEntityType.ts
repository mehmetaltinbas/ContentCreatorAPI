import mongoose from 'mongoose';

export interface Audio {
    _id: unknown;
    userId: mongoose.Schema.Types.ObjectId;
    contentId: mongoose.Schema.Types.ObjectId;
    scriptId: mongoose.Schema.Types.ObjectId;
    sceneNumber: number;
    order: number;
    audioUrl: string;
}
