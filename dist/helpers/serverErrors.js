"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getErrorByCode = void 0;
const getErrorByCode = (error) => {
    switch (error) {
        default:
            return {
                status: 500,
                errorMessage: 'Internal Server Error',
            };
    }
};
exports.getErrorByCode = getErrorByCode;
//# sourceMappingURL=serverErrors.js.map