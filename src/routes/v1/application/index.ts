import { Router, Request, Response, NextFunction } from 'express';
import { authWrapper } from '../../../auth';
import { requestWrapper } from '../../../middlewares';
import { getByName } from './controller';

const router = Router();

router.get('/:name', [requestWrapper(async (req: Request, res: Response, next: NextFunction) => {
  const result = await getByName(req.params.name);

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
