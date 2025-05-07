'use strict';
var __importDefault =
    (this && this.__importDefault) ||
    function (mod) {
        return mod && mod.__esModule ? mod : { default: mod };
    };
Object.defineProperty(exports, '__esModule', { value: true });
const mongoose_1 = __importDefault(require('mongoose'));
const VideoSchema = new mongoose_1.default.Schema({
    scriptId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Script',
        required: true,
    },
    videoNumber: { type: Number, required: true },
    header: { type: String, required: true },
    videoUrl: { type: String, required: true },
    thumbnailUrl: { type: String, required: true },
});
const Video = mongoose_1.default.model('Video', VideoSchema);
exports.default = Video;
//# sourceMappingURL=Video.js.map
