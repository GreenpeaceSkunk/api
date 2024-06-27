import path from 'path';
import fs from 'fs';
import YAML from 'yaml';
import { Request } from 'express';

const paymentGateways: {[id: number]: string | null} = {
  0: null,
  1: 'Mercadopago',
  2: 'PayU',
  3: 'Transbank',
}

export const getCouponByName = async (req: Request): Promise<any> => {
  const environment = req.query.env as string;
  const country = req.query.topLevelDomain;

  let files: any[] = [];

  try {
    const dirName = `${path.resolve('src')}/data/application/coupon/${country}`;
    const dir = await fs.promises.opendir(`${dirName}`);
    
    for await (const file of dir) {
      files = [...files].concat(file.name.split('.')[0]);
    }

    const couponName = files.includes(req.params.name) ? req.params.name : 'general';
    const {data} = await YAML.parse(fs.readFileSync(`${dirName}/${couponName}.yaml`, 'utf-8'));

    const parsedData = {
      name: data.name,
      site_title: data.site_title,
      country: data.country,
      content: {
        ...data.content,
        header: {
          ...data.content.header,

          // This should be updated reviewed when all coupons include banner's structure
          ...(data.content.header.banner) ?
          {
            banner: {
              ...data.content.header.banner,
              type: (data.content.header.banner.url.slice(data.content.header.banner.url.length - 3) === 'mp4')
                ? 'video'
                : 'image',
              url: `${country}/${data.content.header.banner.url}`,
            },
          } : {
            picture: `${country}/${data.content.header.picture}`,
          }
        },
      },
      settings: {
        ...data.settings,
        tracking: {
          ...data.settings.tracking.default,
          ...(data.overrides.environment[environment]?.settings.tracking)
            && data.overrides.environment[environment].settings.tracking,
        },
        services: {
          ...data.settings.services.default,
          ...(data.overrides.environment[environment]?.settings.services)
            && data.overrides.environment[environment].settings.services,
        },
      },
      features: {
        ...data.features.default,
        ...(data.overrides.environment[environment]?.features)
          && data.overrides.environment[environment].features,
      },
    };
    
    parsedData.features.payment_gateway.third_party = paymentGateways[parsedData.features.payment_gateway.third_party];

    if(parsedData.features.payment_gateway.enabled && !parsedData.features.payment_gateway.third_party) {
      return Promise.resolve({
        errorMessage: 'If Payment Gateway is enabled, third party might be defined.',
      });
    }

    return Promise.resolve(parsedData);
  } catch (err) {
    return Promise.resolve({
      errorMessage: `Error: coupon '${req.params.name}' does not exist at '${country}' or malformed.`,
    });
  }
}
