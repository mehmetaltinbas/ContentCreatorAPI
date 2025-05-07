import mongoose from 'mongoose';

export interface Script {
    _id: unknown;
    userId: mongoose.Schema.Types.ObjectId;
    contentId: mongoose.Schema.Types.ObjectId;
    sceneNumber: number;
    scriptText: string;
}
