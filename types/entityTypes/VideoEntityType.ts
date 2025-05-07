import mongoose from 'mongoose';

export interface Video {
    _id: unknown;
    contentId: mongoose.Schema.Types.ObjectId;
    imageId: mongoose.Schema.Types.ObjectId;
    audioId: mongoose.Schema.Types.ObjectId;
    header: string;
    videoUrl: string;
    thumbnailUrl: string;
    isPublished: boolean;
}
