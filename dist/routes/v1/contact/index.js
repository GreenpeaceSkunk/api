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
const express_1 = require("express");
const middlewares_1 = require("../../../middlewares");
const axios_1 = __importDefault(require("axios"));
const router = express_1.Router();
router.get('/', [middlewares_1.requestWrapper((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield axios_1.default({
            baseURL: `${process.env.HUBSPOT_API_URL}/contacts/v1/lists/all/contacts/all`,
            params: {
                hapikey: process.env.HUBSPOT_API_KEY,
            },
        });
        res
            .status(200)
            .json(result.data.contacts.map((contact) => contact.properties));
    }))]);
router.get('/email/:email', [middlewares_1.requestWrapper((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield axios_1.default({
            baseURL: `${process.env.HUBSPOT_API_URL}/contacts/v1/contact/email/${req.params.email}/profile`,
            params: {
                hapikey: process.env.HUBSPOT_API_KEY,
            },
        });
        res
            .status(200)
            .json(Object
            .keys(result.data.properties)
            .reduce((a, b) => (Object.assign(Object.assign({}, a), { [`${b}`]: result.data.properties[b].value })), {}));
    }))]);
router.post('/', [middlewares_1.requestWrapper((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield axios_1.default({
            baseURL: `${process.env.HUBSPOT_API_URL}/contacts/v1/contact`,
            method: 'POST',
            params: {
                hapikey: process.env.HUBSPOT_API_KEY,
            },
            data: {
                properties: Object.keys(req.body).map((key) => ({
                    property: `${key}`,
                    value: req.body[key],
                })),
            },
        });
        res
            .status(201)
            .json(Object.assign({ id: result.data.vid }, req.body));
    }))]);
exports.default = router;
//# sourceMappingURL=index.js.map