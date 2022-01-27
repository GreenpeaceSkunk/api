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
const auth_1 = require("../../../../auth");
const middlewares_1 = require("../../../../middlewares");
const controller_1 = require("./controller");
const router = express_1.Router();
router.get('/', [auth_1.authWrapper, middlewares_1.requestWrapper((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield controller_1.getAll();
        res
            .status(200)
            .json(result.data.contacts.map((contact) => contact.properties));
    }))]);
router.get('/email/:email', [auth_1.authWrapper, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield controller_1.findByEmail(req.params.email);
        if (result) {
            res
                .status(200)
                .json(Object
                .keys(result.data.properties)
                .reduce((a, b) => (Object.assign(Object.assign({}, a), { [`${b}`]: result.data.properties[b].value })), {}));
        }
        else {
            res
                .status(404)
                .json({
                status: 404,
                errorMessage: 'User does not exist.',
            });
        }
    })]);
router.post('/', [auth_1.authWrapper, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        console.log("x-greenlab-app", req.headers['x-greenlab-app']);
        const result = yield controller_1.createOne(req.body);
        if (result) {
            res
                .status(201)
                .json(Object.assign({ id: result.data.vid }, req.body));
        }
        else {
            res
                .status(500)
                .json({
                status: 500,
                errorMessage: 'User cannot be created or maybe exists.',
            });
        }
    })]);
router.post('/email/:email', [auth_1.authWrapper, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield controller_1.updateOne(req.params.email, req.body);
        console.log(result);
        if (result) {
            res
                .status(201)
                .json(Object.assign({ id: result.data.vid }, req.body));
        }
        else {
            res
                .status(404)
                .json({
                status: 204,
                errorMessage: 'User does not exist.',
            });
        }
    })]);
exports.default = router;
//# sourceMappingURL=index.js.map