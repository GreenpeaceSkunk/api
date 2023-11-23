import { Router, Request, Response, NextFunction } from 'express';
import { requestWrapper } from '../../../middlewares';
import { DomainType, getCouponByName } from './controller';

const router = Router();

router.get('/coupon/:name', [requestWrapper(async (req: Request, res: Response, next: NextFunction) => {
  const clientUrl = req.header('Referer') || '';

  let country = 'co';

  if((clientUrl.match(/\.ar\//) || '').length) {
    country = 'ar';
  }

  if((clientUrl.match(/\.co\//) || '').length) {
    country = 'co';
  }

  if((clientUrl.match(/\.cl\//) || '').length) {
    country = 'cl';
  }

  if(country !== '') {
    const result = await getCouponByName(req.params.name, `${req.query.env}`, country as DomainType);

    if(result) {
      res
        .status(200)
        .json(result);
    } else {
      res
        .status(404)
        .json({});
    }
  } else {
    res
      .status(404)
      .json({
        errorMessage: '`.ar|.co|.cl` is undefined',
      });
  }
})]);

export default router;
