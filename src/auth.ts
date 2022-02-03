import { Request, Response, NextFunction } from 'express';
import { requestWrapper } from "./middlewares";
import { IRequestError } from 'greenpeace';

export const authWrapper: any = requestWrapper(async (req: Request, res: Response, next: NextFunction) => {
  if(!req.headers['x-greenlab-app'] && req.headers['x-greenlab-app'] !== null) {
    res
      .status(403)
      .json({
        status: 403,
        errorMessage: 'Forbbiden',
      } as IRequestError);
  } else {
    next();
  }
});
