'use strict';
var __importDefault =
    (this && this.__importDefault) ||
    function (mod) {
        return mod && mod.__esModule ? mod : { default: mod };
    };
Object.defineProperty(exports, '__esModule', { value: true });
const mongoose_1 = __importDefault(require('mongoose'));
const AudioSchema = new mongoose_1.default.Schema({
    scriptId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Script',
        required: true,
    },
    sceneNumber: { type: Number, required: true },
    order: { type: Number },
    audioUrl: { type: String, required: true },
});
const Audio = mongoose_1.default.model('Audio', AudioSchema);
exports.default = Audio;
//# sourceMappingURL=Audio.js.map
