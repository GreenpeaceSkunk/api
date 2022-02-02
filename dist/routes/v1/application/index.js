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
const controller_1 = require("./controller");
const router = express_1.Router();
router.get('/coupon/:name', [middlewares_1.requestWrapper((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        console.log(req.query.env);
        const result = yield controller_1.getCouponByName(req.params.name, `${req.query.env}`);
        if (result) {
            res
                .status(200)
                .json(result);
        }
        else {
            res
                .status(404)
                .json({});
        }
    }))]);
exports.default = router;
//# sourceMappingURL=index.js.map