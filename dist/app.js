"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use((0, morgan_1.default)('dev'));
app.use((req, res, next) => {
    res.set({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'DELETE,GET,PATCH,POST,PUT',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
        'Access-Control-Expose-Headers': 'X-Greenlab-App',
    });
    next();
});
app.use(body_parser_1.default.json({ limit: '4mb' }));
app.use(body_parser_1.default.urlencoded({
    limit: '4mb',
    extended: true,
}));
app.use(express_1.default.static('public'));
app.use('/images', express_1.default.static('images'));
exports.default = app;
//# sourceMappingURL=app.js.map