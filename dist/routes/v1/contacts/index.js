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
const express_1 = require("express");
// import { IUser } from 'greenpeace';
const middlewares_1 = require("../../../middlewares");
// import { create, findAll } from '../user/controller';
const api_client_1 = require("@hubspot/api-client");
// const hubspotClient = new hubspot.Client({ apiKey: YOUR_API_KEY })
const router = express_1.Router();
const hubspotClient = new api_client_1.Client({ apiKey: 'fcffbf78-18c5-40f0-a06f-5efd732f4b97' });
router.get('/contacts', [middlewares_1.requestWrapper((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const contacts = yield hubspotClient.crm.contacts.getAll();
        res
            .status(200)
            .json(contacts);
    }))]);
router.post('/contact', [middlewares_1.requestWrapper((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        // const body = req.body as any;
        const contact = yield hubspotClient.crm.contacts.basicApi.create({
            properties: req.body,
        });
        console.log(contact.response.statusCode);
        res
            .status(contact.response.statusCode)
            .json({
            id: contact.body.id,
        });
    }))]);
exports.default = router;
//# sourceMappingURL=index.js.map