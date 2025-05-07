import mongoose from 'mongoose';

interface ImageDocument extends mongoose.Document {
    userId: mongoose.Schema.Types.ObjectId;
    contentId: mongoose.Schema.Types.ObjectId;
    scriptId: mongoose.Schema.Types.ObjectId;
    boundedScriptText: string;
    sceneNumber: number;
    order: number;
    filePath: string;
    imageUrl: string;
}

const ImageSchema: mongoose.Schema<ImageDocument> = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    contentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Content', required: true },
    scriptId: { type: mongoose.Schema.Types.ObjectId, ref: 'Script', required: true },
    boundedScriptText: { type: String, required: true },
    sceneNumber: { type: Number, required: true },
    order: { type: Number, required: true },
    filePath: { type: String, required: true },
    imageUrl: { type: String },
});

const Image = mongoose.model('Image', ImageSchema);

export default Image;
