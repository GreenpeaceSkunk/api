import { Router, Request, Response, NextFunction } from 'express';
import { requestWrapper } from '../../../../middlewares';
import { create, confirm } from './controller';

const router = Router();

router.post('/create', [
  requestWrapper(
    create,
  ),
]);

// router.post('/confirm', [requestWrapper(async (req: Request, res: Response, next: NextFunction) => {
//   res.json(await confirm(req.body));
// })]);
router.post('/confirm', [requestWrapper(confirm)]);

export default router;
