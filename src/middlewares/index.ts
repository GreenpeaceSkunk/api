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
  } catch(e: any) {
    // const status = (e.response.status) ? e.response.status : 500;
    const status = 500;
    // const errorMessage = (e.response.statusText) ? e.response.statusText : 'Internal Server Error';
    const errorMessage = 'Internal Server Error';
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
