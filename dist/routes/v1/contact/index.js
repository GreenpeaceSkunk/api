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
// import { IUser } from 'greenpeace';
const middlewares_1 = require("../../../middlewares");
// import { create, findAll } from '../user/controller';
const api_client_1 = require("@hubspot/api-client");
const axios_1 = __importDefault(require("axios"));
// const hubspotClient = new hubspot.Client({ apiKey: YOUR_API_KEY })
const router = express_1.Router();
const hubspotClient = new api_client_1.Client({ apiKey: 'fcffbf78-18c5-40f0-a06f-5efd732f4b97' });
// https://legacydocs.hubspot.com/docs/methods/contacts/update_contact
router.get('/', [middlewares_1.requestWrapper((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const contacts = yield axios_1.default({
            baseURL: 'https://api.hubapi.com/contacts/v1/lists/all/contacts/all',
            params: {
                hapikey: 'fcffbf78-18c5-40f0-a06f-5efd732f4b97',
            },
        });
        res
            .status(200)
            .json(contacts.data.contacts.map((c) => c.properties));
    }))]);
router.get('/email/:email', [middlewares_1.requestWrapper((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const contact = yield axios_1.default({
            baseURL: `https://api.hubapi.com/contacts/v1/contact/email/${req.params.email}/profile`,
            params: {
                hapikey: 'fcffbf78-18c5-40f0-a06f-5efd732f4b97'
            },
        });
        res
            .status(200)
            .json(contact.data.properties);
    }))]);
router.post('/', [middlewares_1.requestWrapper((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        // const body = req.body as any;
        // const contact = await hubspotClient.crm.contacts.basicApi.create({
        //   properties: req.body as any,
        // });
        const contact = yield axios_1.default({
            baseURL: `https://api.hubapi.com/contacts/v1/contact`,
            method: 'POST',
            params: {
                hapikey: 'fcffbf78-18c5-40f0-a06f-5efd732f4b97'
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
            .json(Object.assign({ id: contact.data.vid }, req.body));
    }))]);
exports.default = router;
//# sourceMappingURL=index.js.map