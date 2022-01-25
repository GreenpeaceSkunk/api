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
const middlewares_1 = require("../../../middlewares");
const controller_1 = require("../user/controller");
const router = express_1.Router();
router.get('/', [middlewares_1.requestWrapper((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const users = yield controller_1.findAll();
        res
            .status(200)
            .json(users);
    }))]);
router.post('/', [middlewares_1.requestWrapper((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const body = req.body;
        const user = yield controller_1.create(body);
        res
            .status(201)
            .json(user);
    }))]);
exports.default = router;
//# sourceMappingURL=index.js.map