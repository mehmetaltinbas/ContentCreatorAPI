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
exports.entities = exports.connectDb = void 0;
const mongoose_1 = __importDefault(require('mongoose'));
const dotenv_1 = __importDefault(require('dotenv'));
const User_1 = __importDefault(require('./entities/User'));
const Prompt_1 = __importDefault(require('./entities/Prompt'));
const Script_1 = __importDefault(require('./entities/Script'));
const Image_1 = __importDefault(require('./entities/Image'));
const Audio_1 = __importDefault(require('./entities/Audio'));
const Video_1 = __importDefault(require('./entities/Video'));
dotenv_1.default.config();
const connectDb = () =>
    __awaiter(void 0, void 0, void 0, function* () {
        try {
            const dbConnection = process.env.DB_CONNECTION;
            if (!dbConnection) throw new Error('DB_CONNECTION is not defined in .env file');
            const connection = yield mongoose_1.default.connect(dbConnection, {
                dbName: process.env.DB_NAME,
            });
            console.log(
                'MongoDB connected successfully to database: ',
                connection.connection.name,
            );
        } catch (error) {
            if (error instanceof Error) {
                console.error('MongoDB connection failed:', error.message);
            } else {
                console.error('MongoDB connection failed:', error);
            }
            process.exit(1);
        }
    });
exports.connectDb = connectDb;
const entities = {
    User: User_1.default,
    Prompt: Prompt_1.default,
    Script: Script_1.default,
    Image: Image_1.default,
    Audio: Audio_1.default,
    Video: Video_1.default,
};
exports.entities = entities;
//# sourceMappingURL=db.js.map
