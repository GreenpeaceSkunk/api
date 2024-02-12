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
      .json(Object.keys(result.data).map((province: string) => {
        return {
          name: province,
          slug: province.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, ""),
          cities: result.data[province],
        }
      }));
  } else {
    res
      .status(404)
      .json({});
  }
})]);

export default router;
