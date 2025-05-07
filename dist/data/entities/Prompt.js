'use strict';
var __importDefault =
    (this && this.__importDefault) ||
    function (mod) {
        return mod && mod.__esModule ? mod : { default: mod };
    };
Object.defineProperty(exports, '__esModule', { value: true });
const mongoose_1 = __importDefault(require('mongoose'));
const PromptSchema = new mongoose_1.default.Schema({
    userId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'User', required: true },
    niche: { type: String },
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
const Prompt = mongoose_1.default.model('Prompt', PromptSchema);
exports.default = Prompt;
//# sourceMappingURL=Prompt.js.map
