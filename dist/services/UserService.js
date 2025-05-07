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
const db_1 = require('../data/db');
const ErrorHandler_1 = require('../utilities/ErrorHandler');
const bcrypt_1 = __importDefault(require('bcrypt'));
const jsonwebtoken_1 = __importDefault(require('jsonwebtoken'));
const SignUpAsync = (0, ErrorHandler_1.errorHandler)(function UserService_SignUpAsync(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const passwordHash = bcrypt_1.default.hashSync(data.password, 10);
        yield db_1.entities.User.create({
            userName: data.userName,
            passwordHash: passwordHash,
        });
        return { isSuccess: true, message: 'signed up' };
    });
});
const SignInAsync = (0, ErrorHandler_1.errorHandler)(function UserService_SignInAsync(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const passwordHash = bcrypt_1.default.hashSync(data.password, 10);
        const user = yield db_1.entities.User.findOne({
            userName: data.userName,
        });
        if (!user) return { isSuccess: true, message: 'wrong username' };
        const passwordComparison = yield bcrypt_1.default.compare(
            user.passwordHash,
            passwordHash,
        );
        if (!passwordComparison) return { isSuccess: false, message: 'wrong password' };
        const jwtSecret = process.env.JWT_SIGNATURE;
        if (!jwtSecret) throw new Error('JWT_SIGNATURE is not defined.');
        const token = jsonwebtoken_1.default.sign(
            {
                userId: user._id,
            },
            jwtSecret,
            {
                expiresIn: '1h',
            },
        );
        return {
            isSuccess: true,
            message: 'signed in',
            data: { jwt: token },
        };
    });
});
const AuthorizeAsync = (0, ErrorHandler_1.errorHandler)(
    function UserService_AuthorizeAsync(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield db_1.entities.User.findById({
                _id: userId,
            });
            if (!user) return { isSuccess: false, message: 'user authorized but not found' };
            return { isSuccess: true, message: 'user verified' };
        });
    },
);
const GetAllAsync = (0, ErrorHandler_1.errorHandler)(function UserService_GetAllAsync() {
    return __awaiter(this, void 0, void 0, function* () {
        const users = yield db_1.entities.User.find();
        if (!users) return { isSuccess: false, message: "users couldn't read" };
        return { isSuccess: true, message: 'users read', data: { users } };
    });
});
const GetByIdAsync = (0, ErrorHandler_1.errorHandler)(
    function UserService_GetByIdAsync(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield db_1.entities.User.findById({ _id: userId });
            if (!user) return { isSuccess: false, message: "user couldn't read" };
            return { isSuccess: true, message: 'user read', data: { user } };
        });
    },
);
const UpdateAsync = (0, ErrorHandler_1.errorHandler)(function UserService_UpdateAsync(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const updatedUser = yield db_1.entities.User.findByIdAndUpdate({ _id: data.userId });
        if (!updatedUser) return { isSuccess: false, message: "user coldn't updated" };
        return { isSuccess: true, message: 'user updated' };
    });
});
const DeleteAsync = (0, ErrorHandler_1.errorHandler)(
    function UserService_DeleteAasync(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const deletedUser = yield db_1.entities.User.findByIdAndDelete({ _id: userId });
            if (!deletedUser) return { isSuccess: false, message: "user couldn't deleted" };
            return { isSuccess: true, message: 'user deleted' };
        });
    },
);
exports.default = {
    SignUpAsync,
    SignInAsync,
    AuthorizeAsync,
    GetAllAsync,
    GetByIdAsync,
    UpdateAsync,
    DeleteAsync,
};
//# sourceMappingURL=UserService.js.map
