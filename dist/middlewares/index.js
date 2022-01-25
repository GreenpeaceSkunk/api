"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestWrapper = void 0;
const serverErrors_1 = require("../helpers/serverErrors");
const requestWrapper = (fn) => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const fnReturn = yield fn(req, res, next);
        return fnReturn;
    }
    catch (e) {
        const error = serverErrors_1.getErrorByCode(e.code || e.message);
        res
            .status(500)
            .json({
            status: error.status,
            message: error.message,
            errorMessage: (error.status === 500 && e.message !== '')
                ? e.message
                : error.errorMessage,
        });
    }
});
exports.requestWrapper = requestWrapper;
//# sourceMappingURL=index.js.map