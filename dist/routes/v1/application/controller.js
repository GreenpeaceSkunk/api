"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCouponByName = void 0;
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const yaml_1 = __importDefault(require("yaml"));
const getCouponByName = async (name, environment) => {
    try {
        // const defaults = await YAML.parse(fs.readFileSync(`${path.resolve('src')}/data/application/coupon/defaults.yaml`, 'utf-8'));
        const coupon = await yaml_1.default.parse(fs_1.default.readFileSync(`${path_1.default.resolve('src')}/data/application/coupon/${name}.yaml`, 'utf-8'));
        return Promise.resolve({
            content: {
                // ...defaults.data.content ?? defaults.data.content,
                ...coupon.data.content,
            },
            settings: {
                // ...defaults.data.settings ? defaults.data.settings[environment] : {},
                ...coupon.data.settings[environment],
            },
            // features: {
            //   ...defaults.data.features ?? defaults.data.features,
            // },
        });
    }
    catch (error) {
        return Promise.resolve(null);
    }
};
exports.getCouponByName = getCouponByName;
//# sourceMappingURL=controller.js.map