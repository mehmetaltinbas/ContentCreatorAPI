import mongoose from 'mongoose';

interface ContentDocument extends mongoose.Document {
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

const ContentSchema: mongoose.Schema<ContentDocument> = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    promptId: { type: mongoose.Schema.Types.ObjectId, ref: 'Prompt', required: true },
    contentNumber: { type: Number, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    tags: [{ type: String }],
    isPublished: { type: Boolean, required: true },
    scenesCount: { type: Number, required: true },
    averageSceneDuration: { type: Number, required: true },
});

const Content = mongoose.model('Content', ContentSchema);

export default Content;
