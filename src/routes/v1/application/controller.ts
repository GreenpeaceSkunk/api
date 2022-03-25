import path from 'path';
import fs from 'fs';
import YAML from 'yaml';

export const getCouponByName = async (name: string, environment: string): Promise<any> => {
  try {
    // const defaults = await YAML.parse(fs.readFileSync(`${path.resolve('src')}/data/application/coupon/defaults.yaml`, 'utf-8'));
    const coupon = await YAML.parse(fs.readFileSync(`${path.resolve('src')}/data/application/coupon/${name}.yaml`, 'utf-8'));

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
  } catch(error: any) {
    return Promise.resolve(null);
  }
}
