import mongoose from 'mongoose';

interface AudioDocument extends mongoose.Document {
    userId: mongoose.Schema.Types.ObjectId;
    scriptId: mongoose.Schema.Types.ObjectId;
    contentId: mongoose.Schema.Types.ObjectId;
    sceneNumber: number;
    order: number;
    filePath: string;
    audioUrl: string;
}

const AudioSchema: mongoose.Schema<AudioDocument> = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    scriptId: { type: mongoose.Schema.Types.ObjectId, ref: 'Script', required: true },
    contentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Content', required: true },
    sceneNumber: { type: Number, required: true },
    order: { type: Number },
    filePath: { type: String },
    audioUrl: { type: String },
});

const Audio = mongoose.model('Audio', AudioSchema);

export default Audio;
