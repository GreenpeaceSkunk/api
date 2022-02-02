import path from 'path';
import fs from 'fs';
import YAML from 'yaml';

export const getCouponByName = async (name: string, environment: string): Promise<any> => {
  try {
    console.log(`${path.resolve('src')}/data/application/coupon/${name}.yaml`)
    const { data } = await YAML.parse(fs.readFileSync(`${path.resolve('src')}/data/application/coupon/${name}.yaml`, 'utf-8'))
    console.log(data)
    // const content = await YAML.parse(fs.readFileSync(`${path.resolve('src')}/data/application/coupon/${name}/content.yaml`, 'utf-8'));
    // const settings = await YAML.parse(fs.readFileSync(`${path.resolve('src')}/data/application/coupon/${name}/settings.yaml`, 'utf-8'));
    // return Promise.resolve({...{content: content.data}, ...{settings: settings.data[environment]}});
    return Promise.resolve({...{content: data.content}, ...{settings: data.settings[environment]}});
    return Promise.resolve(data);
  } catch(error: any) {
    return Promise.resolve(null);
  }
}
