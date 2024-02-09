import path from 'path';
import fs from 'fs';
import YAML from 'yaml';
import { getCountryByReferer } from '../../../utils/general';
import { Request } from 'express';

const paymentGateways: {[id: number]: string | null} = {
  0: null,
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

    const parsedData = {
      name: data.name,
      site_title: data.site_title,
      country: data.country,
      content: data.content,
      settings: {
        ...data.settings,
        tracking: {
          ...data.settings.tracking.default,
          ...(data.overrides.environment[environment]?.tracking)
            && data.overrides.environment[environment].tracking,
        },
        service: {
          ...data.settings.service.default,
          ...(data.overrides.environment[environment]?.service)
            && data.overrides.environment[environment].service,
        },
      },
      features: {
        ...data.features.default,
        ...(data.overrides.environment[environment]?.features)
          && data.overrides.environment[environment].features,
      },
    };

    parsedData.features.payment_gateway.third_party = paymentGateways[parsedData.features.payment_gateway.third_party];

    if(parsedData.features.payment_gateway.enabled && !paymentGateways[parsedData.features.payment_gateway.third_party]) {
      return Promise.resolve({
        errorMessage: 'If Payment Gateway is enabled, third party might be defined.',
      });
    }

    return Promise.resolve(parsedData);
  } catch (err) {
    return Promise.resolve({
      errorMessage: `The coupon "${couponName}" or "general" at "${domain}" does not exist.`,
    });
  }
}
