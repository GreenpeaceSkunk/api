import path from 'path';
import fs from 'fs';
import YAML from 'yaml';
import { getCountryByReferer } from '../../../utils/general';
import { Request } from 'express';

const paymentGateways: {[id: number]: string} = {
  1: 'Mercadopago',
  2: 'PayU',
  3: 'Transbank',
}

export const getCouponByName = async (req: Request): Promise<any> => {
  const couponName = 'test';
  const environment = req.query.env as string;
  const domain = getCountryByReferer(req.header('Referer'));

  let files: any[] = [];

  try {
    const dirName = `${path.resolve('src')}/data/application/coupon/${domain}`;
    const dir = await fs.promises.opendir(`${dirName}`);
    
    for await (const dirent of dir) {
      files = [...files].concat(dirent.name.split('.')[0]);
    }
    
    const {data} = await YAML.parse(fs.readFileSync(`${dirName}/${files.includes(couponName) ? couponName : 'general'}.yaml`, 'utf-8'));
    
    return Promise.resolve({
      ...data,
      settings: {
        general: data.settings.general,
        ...data.settings[environment],
      },
      features: data.features ? {
        ...data.features.default,
        payment_gateway: {
          ...data.features.default.payment_gateway,
          third_party: paymentGateways[data.features.default.payment_gateway.third_party],
          ...data.features[environment].payment_gateway,
        },
      } : {},
    });
  } catch (err) {
    return Promise.resolve({
      errorMessage: `The coupon "${couponName}" or "general" at "${domain}" does not exist.`,
    });
  }
}
