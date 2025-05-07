'use strict';
var __awaiter =
    (this && this.__awaiter) ||
    function (thisArg, _arguments, P, generator) {
        function adopt(value) {
            return value instanceof P
                ? value
                : new P(function (resolve) {
                      resolve(value);
                  });
        }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) {
                try {
                    step(generator.next(value));
                } catch (e) {
                    reject(e);
                }
            }
            function rejected(value) {
                try {
                    step(generator['throw'](value));
                } catch (e) {
                    reject(e);
                }
            }
            function step(result) {
                result.done
                    ? resolve(result.value)
                    : adopt(result.value).then(fulfilled, rejected);
            }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };
var __importDefault =
    (this && this.__importDefault) ||
    function (mod) {
        return mod && mod.__esModule ? mod : { default: mod };
    };
Object.defineProperty(exports, '__esModule', { value: true });
const express_1 = __importDefault(require('express'));
const UserService_1 = __importDefault(require('../services/UserService'));
const AuthMiddleware_1 = require('../middlewares/AuthMiddleware');
const router = express_1.default.Router();
router.post('/signup', function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = req.body;
        const result = yield UserService_1.default.SignUpAsync(data);
        res.json(result);
    });
});
router.post('/signin', function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = req.body;
        const result = yield UserService_1.default.SignInAsync(data);
        res.json(result);
    });
});
router.post('/signout', AuthMiddleware_1.authMiddleware, function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        res.clearCookie('jwt', { httpOnly: true, secure: true, sameSite: 'strict' });
        res.json({ isSuccess: true, message: 'Signed out successfuly' });
    });
});
router.get('/authorize', AuthMiddleware_1.authMiddleware, function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const request = req;
        const userId = request.user.userId;
        const result = yield UserService_1.default.AuthorizeAsync(userId);
        res.json(result);
    });
});
router.get('/getall', function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield UserService_1.default.GetAllAsync();
        res.json(result);
    });
});
router.get('/getbyid/:userId', function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = req.params.userId;
        const result = yield UserService_1.default.GetByIdAsync(userId);
        res.json(result);
    });
});
router.patch('/update', AuthMiddleware_1.authMiddleware, function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const request = req;
        const data = request.body;
        data.userId = request.user.userId;
        const result = yield UserService_1.default.UpdateAsync(data);
        res.json(result);
    });
});
router.delete('/delete', AuthMiddleware_1.authMiddleware, function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const request = req;
        const userId = request.user.userId;
        const result = yield UserService_1.default.DeleteAsync(userId);
        res.json(result);
    });
});
exports.default = router;
//# sourceMappingURL=UserController.js.map
