"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authWrapper = void 0;
const middlewares_1 = require("./middlewares");
exports.authWrapper = (0, middlewares_1.requestWrapper)(async (req, res, next) => {
    if (!req.headers['x-greenlab-app'] && req.headers['x-greenlab-app'] !== null) {
        res
            .status(403)
            .json({
            status: 403,
            errorMessage: 'Forbbiden',
        });
    }
    else {
        next();
    }
});
//# sourceMappingURL=auth.js.map