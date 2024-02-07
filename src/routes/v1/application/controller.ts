import path from 'path';
import fs from 'fs';
import YAML from 'yaml';
import { DomainType } from 'greenpeace';

export const getCouponByName = async (name: string, environment: string, domain: DomainType): Promise<any> => {
  let files: any[] = [];

  try {
    const dirName = `${path.resolve('src')}/data/application/coupon/${domain}`;
    const dir = await fs.promises.opendir(`${dirName}`);
    
    for await (const dirent of dir) {
      files = [...files].concat(dirent.name.split('.')[0]);
    }
    
    const {data} = await YAML.parse(fs.readFileSync(`${dirName}/${files.includes(name) ? name : 'general'}.yaml`, 'utf-8'));
    
    return Promise.resolve({
      ...data,
      settings: {
        general: data.settings.general,
        ...data.settings[environment],
      },
      features: data.features ? {
        use_design_version: data.features.default.use_design_version,
        payment_gateway: {
          ...data.features.default.payment_gateway,
          ...data.features[environment].payment_gateway,
        },
      } : {},
    });

  } catch (err) {
    console.error('Error', err);
    return Promise.resolve(null);
  }
}
