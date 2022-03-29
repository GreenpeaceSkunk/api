"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestWrapper = void 0;
const requestWrapper = (fn) => async (req, res, next) => {
    try {
        console.log('Try..');
        const fnReturn = await fn(req, res, next);
        return fnReturn;
    }
    catch (e) {
        const status = (e.response.status) ? e.response.status : 500;
        const errorMessage = (e.response.statusText) ? e.response.statusText : 'Internal Server Error';
        res
            .status(status)
            .json({
            status,
            errorMessage,
        });
    }
};
exports.requestWrapper = requestWrapper;
//# sourceMappingURL=index.js.map