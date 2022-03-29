"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const middlewares_1 = require("../../../middlewares");
const controller_1 = require("./controller");
const router = (0, express_1.Router)();
router.get('/coupon/:name', [(0, middlewares_1.requestWrapper)(async (req, res, next) => {
        const result = await (0, controller_1.getCouponByName)(req.params.name, `${req.query.env}`);
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
    })]);
exports.default = router;
//# sourceMappingURL=index.js.map