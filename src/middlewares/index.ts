import { IRequestError } from "greenpeace";
import { Request, Response, NextFunction, RequestHandler } from "express";
import { getCountryByReferer } from "../utils/general";

type RequestWrapperType = (fn: RequestHandler) => RequestHandler;
const requestWrapper: RequestWrapperType = (fn: (...args: any[]) => void | Promise<IRequestError> ) => async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const fnReturn = await fn(req, res, next);
    return fnReturn;
  } catch(error: any) {
    console.log('Error', error);
    // const status = (error.response.status) ? error.response.status : 500;
    const status = 500;
    // const errorMessage = (error.response.statusText) ? error.response.statusText : 'API Internal Server Error';
    // const errorMessage = (error.response.statusText) ? error.response.statusText : 'API Internal Server Error';
    res
      .status(status)
      .json({
        status,
        errorMessage: 'API Internal Server Error',
      } as IRequestError);
  }
}

const validateReferer: RequestWrapperType = (fn: (...args: any[]) => void | Promise<IRequestError> ) => async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    if(!getCountryByReferer((req.header('Referer')))) {
      throw new Error('`.ar|.co|.cl` is undefined');
    }

    const fnReturn = await fn(req, res, next);
    return fnReturn;
  } catch(error: any) {
    console.log('Error', error);
    res
      .status(500)
      .json({
        status: 500,
        errorMessage: '`.ar|.co|.cl` is undefined',
      } as IRequestError);
  }
}

export {
  requestWrapper,
  validateReferer,
}
