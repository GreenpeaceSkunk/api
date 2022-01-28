"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const hubspot_1 = __importDefault(require("./hubspot"));
const application_1 = __importDefault(require("./application"));
const router = express_1.Router();
router.use('/hubspot', hubspot_1.default);
router.use('/application', application_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map