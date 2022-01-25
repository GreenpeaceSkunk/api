"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Model = void 0;
const mongoose_1 = require("mongoose");
const schema_1 = require("./schema");
exports.Model = mongoose_1.model('user', schema_1.schema);
//# sourceMappingURL=model.js.map