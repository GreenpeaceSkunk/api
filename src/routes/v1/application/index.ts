import { Router, Request, Response, NextFunction } from 'express';
import { requestWrapper } from '../../../middlewares';
import { getCouponByName } from './controller';
import { getCountryByReferer } from '../../../utils/general';
import { DomainType } from 'greenpeace';

const router = Router();

router.get('/coupon/:name', [requestWrapper(async (req: Request, res: Response, next: NextFunction) => {
  const country = getCountryByReferer(req.header('Referer'));

  try {
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
  } catch (error: any) {
    res
      .status(404)
      .json({ errorMessage: '`.ar|.co|.cl` is undefined' });
  }
})]);

export default router;
