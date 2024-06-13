import { Router, Request, Response, NextFunction } from 'express';
// import { IRequestError } from 'greenpeace';
// import { createOne, findByEmail, getAll, search, updateOne } from './controller';
import { authWrapper, requestWrapper } from '../../../../middlewares';
import { getById } from './controller';

const router = Router();

router.get('/:listId', [requestWrapper(async (req: Request, res: Response, next: NextFunction) => {
  console.log(req.params)
  const result = await getById(req.params.listId);
  res
    .status(200)
    .json(result);
})]);

export default router;
