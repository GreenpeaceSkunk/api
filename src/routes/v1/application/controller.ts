import path from 'path';
import fs from 'fs';
import YAML from 'yaml';

export type DomainType = 'ar' | 'cl' | 'co';

export const getCouponByName = async (name: string, environment: string, domain: DomainType): Promise<any> => {
  let files: any[] = [];

  try {
    const dirName = `${path.resolve('src')}/data/application/coupon/${domain}`;
    const dir = await fs.promises.opendir(`${dirName}`);
    
    for await (const dirent of dir) {
      files = [...files].concat(dirent.name.split('.')[0]);
    }
    
    const coupon = await YAML.parse(fs.readFileSync(`${dirName}/${files.includes(name) ? name : 'general'}.yaml`, 'utf-8'));
    
    return Promise.resolve({
      // name: coupon.data.name,
      // site_title: coupon.data.site_title,
      // country: coupon.data.country,
      // content: coupon.data.content,
      ...coupon.data,
      settings: {
        general: coupon.data.settings.general,
        ...coupon.data.settings[environment],
      },
      features: coupon.data.features ? coupon.data.features[environment] : {},
    });

  } catch (err) {
    console.log('Error', err);
    return Promise.resolve(null);
  }
}
