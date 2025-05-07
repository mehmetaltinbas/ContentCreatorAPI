'use strict';
var __createBinding =
    (this && this.__createBinding) ||
    (Object.create
        ? function (o, m, k, k2) {
              if (k2 === undefined) k2 = k;
              var desc = Object.getOwnPropertyDescriptor(m, k);
              if (
                  !desc ||
                  ('get' in desc ? !m.__esModule : desc.writable || desc.configurable)
              ) {
                  desc = {
                      enumerable: true,
                      get: function () {
                          return m[k];
                      },
                  };
              }
              Object.defineProperty(o, k2, desc);
          }
        : function (o, m, k, k2) {
              if (k2 === undefined) k2 = k;
              o[k2] = m[k];
          });
var __setModuleDefault =
    (this && this.__setModuleDefault) ||
    (Object.create
        ? function (o, v) {
              Object.defineProperty(o, 'default', { enumerable: true, value: v });
          }
        : function (o, v) {
              o['default'] = v;
          });
var __importStar =
    (this && this.__importStar) ||
    (function () {
        var ownKeys = function (o) {
            ownKeys =
                Object.getOwnPropertyNames ||
                function (o) {
                    var ar = [];
                    for (var k in o)
                        if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
                    return ar;
                };
            return ownKeys(o);
        };
        return function (mod) {
            if (mod && mod.__esModule) return mod;
            var result = {};
            if (mod != null)
                for (var k = ownKeys(mod), i = 0; i < k.length; i++)
                    if (k[i] !== 'default') __createBinding(result, mod, k[i]);
            __setModuleDefault(result, mod);
            return result;
        };
    })();
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
const dotenv_1 = __importDefault(require('dotenv'));
const db_1 = require('./data/db');
const promises_1 = __importDefault(require('fs/promises'));
const cors_1 = __importDefault(require('cors'));
const body_parser_1 = __importDefault(require('body-parser'));
const cookie_parser_1 = __importDefault(require('cookie-parser'));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
app.use(
    (0, cors_1.default)({
        origin: `${process.env.FRONTEND_URL}`,
        credentials: true,
    }),
);
app.use((0, cookie_parser_1.default)());
app.use(body_parser_1.default.json({ limit: '10mb' }));
app.use(body_parser_1.default.urlencoded({ limit: '10mb', extended: true }));
app.use('/uploads', express_1.default.static('uploads'));
function loadControllers() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const files = yield promises_1.default.readdir('./Controllers');
            console.log('\n\tLoaded Controllers');
            for (const file of files) {
                const route = file.replace('Controller.ts', '').toLowerCase();
                const controller = yield Promise.resolve(
                    `${`./Controllers/${file.replace('.ts', '.js')}`}`,
                ).then((s) => __importStar(require(s)));
                app.use(`/api/${route}`, controller.default);
                console.log(`/api/${route}`);
            }
            console.log('');
        } catch (err) {
            console.error('Error loading controllers:', err);
        }
    });
}
void (() =>
    __awaiter(void 0, void 0, void 0, function* () {
        yield (0, db_1.connectDb)();
        yield loadControllers();
        app.listen(port, () => {
            console.log(`Server running on http://localhost:${port}`);
        });
    }))();
//# sourceMappingURL=API.js.map
