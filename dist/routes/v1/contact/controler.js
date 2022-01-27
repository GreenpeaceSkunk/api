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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createOne = exports.updateOne = exports.findByEmail = exports.getAll = void 0;
const axios_1 = __importDefault(require("axios"));
const getAll = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield axios_1.default({
        baseURL: `${process.env.HUBSPOT_API_URL}/contacts/v1/lists/all/contacts/all`,
        params: {
            hapikey: process.env.HUBSPOT_API_KEY,
        },
    });
    return result;
});
exports.getAll = getAll;
const findByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    return yield axios_1.default({
        baseURL: `${process.env.HUBSPOT_API_URL}/contacts/v1/contact/email/${email}/profile`,
        params: {
            hapikey: process.env.HUBSPOT_API_KEY,
        },
    })
        .then((result) => result)
        .catch(() => null);
});
exports.findByEmail = findByEmail;
const updateOne = (email, body) => __awaiter(void 0, void 0, void 0, function* () {
    return yield axios_1.default({
        baseURL: `${process.env.HUBSPOT_API_URL}/contacts/v1/contact/email/${email}/profile`,
        method: 'POST',
        params: {
            hapikey: process.env.HUBSPOT_API_KEY,
        },
        data: Object.keys(body).reduce((a, b) => (Object.assign(Object.assign({}, a), { properties: [
                ...(a.properties) ? a.properties : [],
                { property: b, value: body[b] }
            ] })), {}),
    })
        .then((result) => result)
        .catch(() => null);
    ;
});
exports.updateOne = updateOne;
const createOne = (body) => __awaiter(void 0, void 0, void 0, function* () {
    const contact = yield exports.findByEmail(body.email);
    if (!contact) {
        const result = yield axios_1.default({
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
        return exports.updateOne(body.email, body);
    }
});
exports.createOne = createOne;
//# sourceMappingURL=controler.js.map