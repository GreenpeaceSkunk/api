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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCouponByName = void 0;
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const yaml_1 = __importDefault(require("yaml"));
const getCouponByName = (name, environment) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(`${path_1.default.resolve('src')}/data/application/coupon/${name}.yaml`);
        const { data } = yield yaml_1.default.parse(fs_1.default.readFileSync(`${path_1.default.resolve('src')}/data/application/coupon/${name}.yaml`, 'utf-8'));
        console.log(data);
        // const content = await YAML.parse(fs.readFileSync(`${path.resolve('src')}/data/application/coupon/${name}/content.yaml`, 'utf-8'));
        // const settings = await YAML.parse(fs.readFileSync(`${path.resolve('src')}/data/application/coupon/${name}/settings.yaml`, 'utf-8'));
        // return Promise.resolve({...{content: content.data}, ...{settings: settings.data[environment]}});
        return Promise.resolve(Object.assign({ content: data.content }, { settings: data.settings[environment] }));
        return Promise.resolve(data);
    }
    catch (error) {
        return Promise.resolve(null);
    }
});
exports.getCouponByName = getCouponByName;
//# sourceMappingURL=controller.js.map