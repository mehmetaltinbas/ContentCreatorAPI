import mongoose from 'mongoose';

interface PromptDocument extends mongoose.Document {
    userId: mongoose.Schema.Types.ObjectId;
    niche: string;
    description: string;
    imageTheme: string;
    minVideoDuration: number;
    maxVideoDuration: number;
}

const PromptSchema: mongoose.Schema<PromptDocument> = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    niche: { type: String, required: true },
    description: { type: String },
    imageTheme: {
        type: String,
        enum: [
            'Realistic',
            'Cartoon',
            'Pixelated',
            'Minimalist',
            'Futuristic',
            'Retro',
            'Vintage',
            'Noir',
            'Fantasy',
            'Cyberpunk',
            'Sketch',
            'Dark',
        ],
    },
    minVideoDuration: { type: Number, required: true },
    maxVideoDuration: { type: Number, required: true },
});

const Prompt = mongoose.model('Prompt', PromptSchema);

export default Prompt;
