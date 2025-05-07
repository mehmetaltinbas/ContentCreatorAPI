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
Object.defineProperty(exports, '__esModule', { value: true });
exports.errorHandler = void 0;
const errorHandler = (fn) => {
    return (...args) =>
        __awaiter(void 0, void 0, void 0, function* () {
            try {
                return yield fn(...args);
            } catch (error) {
                if (error instanceof Error) {
                    console.error(
                        `\t Error in ${fn.name} \n Error message --> ${error.message} \n Error stack -->`,
                        error.stack,
                    );
                    throw new Error(
                        JSON.stringify({
                            isSuccess: false,
                            source: fn.name,
                            message: error.message,
                        }),
                    );
                }
                throw new Error(
                    JSON.stringify({
                        isSuccess: false,
                        source: fn.name,
                        message: 'An unknown error occured',
                    }),
                );
            }
        });
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=ErrorHandler.js.map
