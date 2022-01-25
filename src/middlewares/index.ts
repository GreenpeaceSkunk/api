import { IRequestError } from "greenpeace";
import { Request, Response, NextFunction, RequestHandler } from "express";
import { getErrorByCode } from "../helpers/serverErrors";

type RequestWrapperType = (fn: RequestHandler) => RequestHandler;
const requestWrapper: RequestWrapperType = (fn: (...args: any[]) => void | Promise<IRequestError> ) => async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const fnReturn = await fn(req, res, next);
    return fnReturn;
    // if(fnReturn) {
    // } else {
    //   throw new Error( 'Error!!' )
    // }
  } catch(e: any) {
    console.log(e.response.data);
    const error = getErrorByCode(e.code || e.message);
    res
      .status(500)
      .json({
        status: error.status,
        // message: e.response.data.errors.length ? e.response.data.errors[0].message : '',
        errorMessage: e.response.data.message,
        // errorMessage: (error.status === 500 && e.message !== '')
        //   ? e.message
        //   : error.errorMessage,
      } as IRequestError);
  }
}

export {
  requestWrapper,
}
