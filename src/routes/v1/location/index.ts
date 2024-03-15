import { Router, Request, Response, NextFunction } from 'express';
import { requestWrapper } from '../../../middlewares';
import { getCities, getCountries, getPlacesByCountry } from './controller';

const router = Router();

router.get('/world/countries', [requestWrapper(async (req: Request, res: Response, next: NextFunction) => {
  const result = await getCountries();
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

router.get('/world/cities', [requestWrapper(async (req: Request, res: Response, next: NextFunction) => {
  const result = await getCities();
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

router.get('/world/countries/:country', [requestWrapper(async (req: Request, res: Response, next: NextFunction) => {
  const result = await getPlacesByCountry(req.params.country);
  if(result) {
    res
      .status(200)
      .json(result.data.map(({ code, data, name }: {name: string; code: number; data: Array<string>}) => {
        return {
          name,
          code,
          slug: name.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, ""),
          cities: data,
        }
      }));
  } else {
    res
      .status(404)
      .json({});
  }
})]);

export default router;
