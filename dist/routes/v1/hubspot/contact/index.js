"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../../../../auth");
const middlewares_1 = require("../../../../middlewares");
const controller_1 = require("./controller");
const router = (0, express_1.Router)();
router.get('/', [auth_1.authWrapper, (0, middlewares_1.requestWrapper)(async (req, res, next) => {
        const result = await (0, controller_1.getAll)();
        res
            .status(200)
            .json(result.data.contacts.map((contact) => contact.properties));
    })]);
router.get('/email/:email', [auth_1.authWrapper, async (req, res, next) => {
        const result = await (0, controller_1.findByEmail)(req.params.email);
        if (result) {
            res
                .status(200)
                .json(Object
                .keys(result.data.properties)
                .reduce((a, b) => ({ ...a, [`${b}`]: result.data.properties[b].value }), {}));
        }
        else {
            res
                .status(404)
                .json({
                status: 404,
                errorMessage: 'User does not exist.',
            });
        }
    }]);
router.post('/', [auth_1.authWrapper, async (req, res, next) => {
        const result = await (0, controller_1.createOne)(req.body);
        if (result) {
            res
                .status(201)
                .json({
                id: result.data.vid,
                ...req.body,
            });
        }
        else {
            res
                .status(500)
                .json({
                status: 500,
                errorMessage: 'User cannot be created or maybe exists.',
            });
        }
    }]);
router.post('/email/:email', [auth_1.authWrapper, async (req, res, next) => {
        const result = await (0, controller_1.updateOne)(req.params.email, req.body);
        if (result) {
            res
                .status(201)
                .json({
                id: result.data.vid,
                ...req.body,
            });
        }
        else {
            res
                .status(404)
                .json({
                status: 204,
                errorMessage: 'User does not exist.',
            });
        }
    }]);
exports.default = router;
//# sourceMappingURL=index.js.map