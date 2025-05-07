'use strict';
var __importDefault =
    (this && this.__importDefault) ||
    function (mod) {
        return mod && mod.__esModule ? mod : { default: mod };
    };
Object.defineProperty(exports, '__esModule', { value: true });
exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require('jsonwebtoken'));
const dotenv_1 = __importDefault(require('dotenv'));
dotenv_1.default.config();
const authMiddleware = (req, res, next) => {
    var _a, _b;
    const token =
        ((_a = req.cookies) === null || _a === void 0 ? void 0 : _a.jwt) ||
        ((_b = req.headers.authorization) === null || _b === void 0
            ? void 0
            : _b.split(' ')[1]) ||
        '';
    if (!token) {
        res.status(401).json({ isSuccess: false, message: 'Unauthorized: No token provided' });
        return;
    }
    jsonwebtoken_1.default.verify(token, process.env.JWT_SIGNATURE, (err, decoded) => {
        if (err) {
            res.status(403).json({ isSuccess: false, message: 'Forbidden: Invalid token' });
            return;
        }
        const payload = decoded;
        if (!payload || !payload.userId) {
            res.status(400).json({
                isSuccess: false,
                message: 'Bad Request: Token missing userId',
            });
            return;
        }
        req.user = payload; // ✅ this now works
        next();
    });
};
exports.authMiddleware = authMiddleware;
//# sourceMappingURL=AuthMiddleware.js.map
