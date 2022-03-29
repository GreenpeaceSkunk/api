"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createOne = exports.updateOne = exports.findByEmail = exports.getAll = void 0;
const axios_1 = __importDefault(require("axios"));
const getAll = async () => {
    const result = await (0, axios_1.default)({
        baseURL: `${process.env.HUBSPOT_API_URL}/contacts/v1/lists/all/contacts/all`,
        params: {
            hapikey: process.env.HUBSPOT_API_KEY,
        },
    });
    return result;
};
exports.getAll = getAll;
const findByEmail = async (email) => {
    return await (0, axios_1.default)({
        baseURL: `${process.env.HUBSPOT_API_URL}/contacts/v1/contact/email/${email}/profile`,
        params: {
            hapikey: process.env.HUBSPOT_API_KEY,
        },
    })
        .then((result) => result)
        .catch(() => null);
};
exports.findByEmail = findByEmail;
const updateOne = async (email, body) => {
    return await (0, axios_1.default)({
        baseURL: `${process.env.HUBSPOT_API_URL}/contacts/v1/contact/email/${email}/profile`,
        method: 'POST',
        params: {
            hapikey: process.env.HUBSPOT_API_KEY,
        },
        data: Object.keys(body).reduce((a, b) => ({
            ...a,
            properties: [
                ...(a.properties) ? a.properties : [],
                { property: b, value: body[b] }
            ],
        }), {}),
    })
        .then((result) => result)
        .catch(() => null);
    ;
};
exports.updateOne = updateOne;
const createOne = async (body) => {
    const contact = await (0, exports.findByEmail)(body.email);
    if (!contact) {
        const result = await (0, axios_1.default)({
            baseURL: `${process.env.HUBSPOT_API_URL}/contacts/v1/contact`,
            method: 'POST',
            params: {
                hapikey: process.env.HUBSPOT_API_KEY,
            },
            data: {
                properties: Object.keys(body).map((key) => ({
                    property: `${key}`,
                    value: body[key],
                })),
            },
        });
        return result;
    }
    else {
        return (0, exports.updateOne)(body.email, body);
    }
};
exports.createOne = createOne;
//# sourceMappingURL=controller.js.map