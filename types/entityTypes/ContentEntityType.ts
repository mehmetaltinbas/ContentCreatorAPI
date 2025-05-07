import mongoose from 'mongoose';

export interface Content {
    _id: unknown;
    userId: mongoose.Schema.Types.ObjectId;
    promptId: mongoose.Schema.Types.ObjectId;
    contentNumber: number;
    title: string;
    description: string;
    tags: string[];
    isPublished: boolean;
    scenesCount: number;
    averageSceneDuration: number;
}
