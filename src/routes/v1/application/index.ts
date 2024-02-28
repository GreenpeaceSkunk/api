import { Router, Request, Response, NextFunction } from 'express';
import { refererWrapper, requestWrapper } from '../../../middlewares';
import { getCouponByName } from './controller';

const router = Router();

router.get('/coupon/:name', [refererWrapper, requestWrapper(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await getCouponByName(req);
    res
      .status(200)
      .json(result);
  } catch (error: any) {
    res
      .status(404)
      .json({ errorMessage: error.errorMessage });
  }
})]);

export default router;
