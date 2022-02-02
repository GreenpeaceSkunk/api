import { Router, Request, Response, NextFunction } from 'express';
import { requestWrapper } from '../../../middlewares';
import { getCouponByName } from './controller';

const router = Router();

router.get('/coupon/:name', [requestWrapper(async (req: Request, res: Response, next: NextFunction) => {
  const result = await getCouponByName(req.params.name, `${req.query.env}`);

  if(result) {
    res
      .status(200)
      .json(result);  
  } else {
    res
      .status(404)
      .json({});
  }
})]);

export default router;
