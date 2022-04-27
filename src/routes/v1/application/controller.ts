import path from 'path';
import fs from 'fs';
import YAML from 'yaml';

export const getCouponByName = async (name: string, environment: string): Promise<any> => {
  let files: any[] = [];
  try {
    const dir = await fs.promises.opendir(`${path.resolve('src')}/data/application/coupon`);
    
    for await (const dirent of dir) {
      files = [...files].concat(dirent.name.split('.')[0]);
    }
    
    const coupon = await YAML.parse(fs.readFileSync(`${path.resolve('src')}/data/application/coupon/${files.includes(name) ? name : 'general'}.yaml`, 'utf-8'));
    
    return Promise.resolve({
      name: coupon.data.name,
      content: coupon.data.content,
      settings: coupon.data.settings[environment],
      features: coupon.data.features ? coupon.data.features[environment] : {},
    });

  } catch (err) {
    console.log('Error', err);
    return Promise.resolve(null);
  }
}
