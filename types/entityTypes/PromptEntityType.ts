import mongoose from 'mongoose';

export interface Prompt {
    _id: unknown;
    userId: mongoose.Schema.Types.ObjectId;
    niche: string;
    description: string;
    imageTheme: string;
    minVideoDuration: number;
    maxVideoDuration: number;
}
