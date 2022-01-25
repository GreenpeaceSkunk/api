"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const v1_1 = __importDefault(require("./v1"));
const router = express_1.Router();
router.use('/v1', v1_1.default);
// router.use('/contacts', v1ContactsRoutes);
exports.default = router;
//# sourceMappingURL=index.js.map