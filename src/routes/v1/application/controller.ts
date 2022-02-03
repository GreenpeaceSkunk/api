import path from 'path';
import fs from 'fs';
import YAML from 'yaml';

export const getCouponByName = async (name: string, environment: string): Promise<any> => {
  try {
    const { data } = await YAML.parse(fs.readFileSync(`${path.resolve('src')}/data/application/coupon/${name}.yaml`, 'utf-8'));
    return Promise.resolve({...{content: data.content}, ...{settings: data.settings[environment]}});
  } catch(error: any) {
    return Promise.resolve(null);
  }
}
