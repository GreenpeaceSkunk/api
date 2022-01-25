"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.schema = void 0;
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    id: {
        type: mongoose_1.Schema.Types.ObjectId,
    },
    fullName: {
        type: String,
    },
    email: {
        type: String,
    },
    birthday: {
        type: String,
    },
    userAgent: {
        type: String,
    }
}, {
    timestamps: true,
    strict: true,
});
exports.schema = schema;
//# sourceMappingURL=schema.js.map