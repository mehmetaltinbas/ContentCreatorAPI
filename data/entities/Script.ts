import mongoose from 'mongoose';

interface ScriptDocument extends mongoose.Document {
    userId: mongoose.Schema.Types.ObjectId;
    contentId: mongoose.Schema.Types.ObjectId;
    sceneNumber: number;
    scriptText: string;
}

const ScriptSchema: mongoose.Schema<ScriptDocument> = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    contentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Content', required: true },
    sceneNumber: { type: Number, required: true },
    scriptText: { type: String, required: true },
});

const Script = mongoose.model('Script', ScriptSchema);

export default Script;
