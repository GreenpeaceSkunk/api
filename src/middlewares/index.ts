import { IRequestError } from "greenpeace";
import { Request, Response, NextFunction, RequestHandler } from "express";
import { getCountryByReferer } from "../utils/general";
// import { getCountryByReferer } from "../utils/general";

type RequestMiddlewareType = (fn: RequestHandler) => RequestHandler;

export const requestWrapper: RequestMiddlewareType = (fn: (...args: any[]) => void | Promise<IRequestError> ) => async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const fnReturn = await fn(req, res, next);
    return fnReturn;
  } catch(error: any) {
    console.log(error.message)
    const status = 500;
    res
      .status(500)
      .json({
        status,
        error: true,
        errorMessage: (error && error.message) ? error.message : 'API Internal Server Error',
        message: (error && error.message) ? error.message : 'API Internal Server Error',
      } as IRequestError);
  }
}

export const authWrapper: any = requestWrapper(async (req: Request, res: Response, next: NextFunction) => {
  if(!req.headers['x-greenlab-app'] && req.headers['x-greenlab-app'] !== null) {
    res
      .status(403)
      .json({
        status: 403,
        errorMessage: 'Forbbiden: invalid application.',
      } as IRequestError);
  } else {
    next();
  }
});

export const refererWrapper: any = requestWrapper(async (req: Request, res: Response, next: NextFunction) => {
  const country = getCountryByReferer(`${req.header('Referer')}`.toLowerCase());
  const countries = ['ar', 'cl', 'co'];

  if(!country || !countries.includes(country)) {
    res
      .status(400)
      .json({
        status: 400,
        errorMessage: `Forbbiden: invalid country code. Received (${country}).`,
      } as IRequestError);
  } else {
    // Include dynamically to query
    req.query.topLevelDomain = country;
    next();
  }
});
