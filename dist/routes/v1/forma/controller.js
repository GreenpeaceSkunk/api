"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getForm = exports.postRecord = void 0;
const axios_1 = __importDefault(require("axios"));
const postRecord = async (formId, body = {}) => {
    const response = await (0, axios_1.default)({
        baseURL: `https://backoffice.greenpeace.org.ar/api/forms/save`,
        method: 'POST',
        data: {
            form_id: formId,
            ...body,
        },
    });
    return response;
};
exports.postRecord = postRecord;
const getForm = async (formId = null) => {
    const response = await (0, axios_1.default)({
        baseURL: `https://backoffice.greenpeace.org.ar/api/forms/dashboard`,
        method: 'GET',
        params: {},
    });
    if (formId) {
        return Object.values(response.data).find((form) => form.formId === formId);
    }
    return Object.values(response.data);
};
exports.getForm = getForm;
//# sourceMappingURL=controller.js.map