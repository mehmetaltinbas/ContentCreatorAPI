'use strict';
var __importDefault =
    (this && this.__importDefault) ||
    function (mod) {
        return mod && mod.__esModule ? mod : { default: mod };
    };
Object.defineProperty(exports, '__esModule', { value: true });
const mongoose_1 = __importDefault(require('mongoose'));
const ScriptSchema = new mongoose_1.default.Schema({
    promptId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Prompt',
        required: true,
    },
    scriptNumber: { type: Number, required: true },
    scriptHeader: { type: String, required: true },
    scriptText: { type: String, required: true },
});
const Script = mongoose_1.default.model('Script', ScriptSchema);
exports.default = Script;
//# sourceMappingURL=Script.js.map
