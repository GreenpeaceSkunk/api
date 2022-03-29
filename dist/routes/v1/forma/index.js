"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const middlewares_1 = require("../../../middlewares");
const controller_1 = require("./controller");
const router = (0, express_1.Router)();
router.post('/form/:formId/record', [async (req, res, next) => {
        // const result = await postRecord(parseInt(req.params.formId), req.body);
        // if(result.status === 200) {
        //   res.status(result.status).json(req.body);  
        // } else {
        //   res.status(result.status);  
        // }
        console.log(req.params.formId, req.body);
        return res.status(200).json({});
    }]);
router.get('/form/:formId?', [(0, middlewares_1.requestWrapper)(async (req, res, next) => {
        const result = await (0, controller_1.getForm)(parseInt(req.params.formId) || null);
        if (result) {
            res.status(200).json(result);
        }
        else {
            res.status(404).json({});
        }
    })]);
exports.default = router;
//# sourceMappingURL=index.js.map