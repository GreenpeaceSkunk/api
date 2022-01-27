import { Router, Request, Response, NextFunction } from 'express';
import { IRequestError } from 'greenpeace';
import { authWrapper } from '../../../auth';
import { requestWrapper } from '../../../middlewares';
import { getAll, getByName } from './controller';

const router = Router();

router.get('/', [authWrapper, requestWrapper(async (req: Request, res: Response, next: NextFunction) => {
  const result = await getAll();
  res
    .status(200)
    .json(result);  
})]);

router.get('/:name', [authWrapper, requestWrapper(async (req: Request, res: Response, next: NextFunction) => {
  const result = await getByName(req.params.name);
  res
    .status(200)
    .json(result);  
})]);

export default router;
