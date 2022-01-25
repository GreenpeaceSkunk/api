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
exports.findAll = exports.create = void 0;
const model_1 = require("./model");
const create = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield new model_1.Model(data).save();
    return {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        birthday: user.birthday,
        userAgent: user.userAgent,
    };
});
exports.create = create;
const findAll = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield model_1.Model.find();
});
exports.findAll = findAll;
//# sourceMappingURL=controller.js.map