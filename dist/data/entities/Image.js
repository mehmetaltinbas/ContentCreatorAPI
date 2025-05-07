'use strict';
var __importDefault =
    (this && this.__importDefault) ||
    function (mod) {
        return mod && mod.__esModule ? mod : { default: mod };
    };
Object.defineProperty(exports, '__esModule', { value: true });
const mongoose_1 = __importDefault(require('mongoose'));
const ImageSchema = new mongoose_1.default.Schema({
    scriptId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Script',
        required: true,
    },
    sceneNumber: { type: Number, required: true },
    order: { type: Number, required: true },
    imageUrl: { type: String, required: true },
});
const Image = mongoose_1.default.model('Image', ImageSchema);
exports.default = Image;
//# sourceMappingURL=Image.js.map
