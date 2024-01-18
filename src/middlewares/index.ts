import { IRequestError } from "greenpeace";
import { Request, Response, NextFunction, RequestHandler } from "express";

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
    console.log(error);
    const status = (error.response.status) ? error.response.status : 500;
    const errorMessage = (error.response.statusText) ? error.response.statusText : 'Internal Server Error';
    res
      .status(status)
      .json({
        status,
        errorMessage,
      } as IRequestError);
  }
}

export {
  requestWrapper,
}
