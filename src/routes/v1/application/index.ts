import { Router, Request, Response, NextFunction } from 'express';
import { refererWrapper, requestWrapper } from '../../../middlewares';
import { getCouponByName } from './controller';
// import { Model } from './model';

const router = Router();

router
  .get(
    '/coupon/:name',
    [
      refererWrapper,
      requestWrapper(async (req: Request, res: Response, next: NextFunction) => {
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
      }
    )],
  );

// router.post('/coupon', [async (req: Request, res: Response, next: NextFunction) => {
//   await Model.create({
//     app_name: 'General',
//   });
//   res.send('OK');
// }]);

export default router;
