import path from 'path';
import fs from 'fs';
import YAML from 'yaml';

export const getCouponByName = async (name: string): Promise<any> => {
  try {
    const result = await YAML.parse(fs.readFileSync(`${path.resolve('src')}/data/application/coupon/${name}.yaml`, 'utf-8'));
    return Promise.resolve(result);
  } catch(error: any) {
    return Promise.resolve(null);
  }
}
