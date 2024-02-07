import { Router, Request, Response, NextFunction } from 'express';
import { requestWrapper } from '../../../middlewares';
import { postRecord, getForm } from './controller';
import { getCountryByReferer } from '../../../utils/general';
import { DomainType } from 'greenpeace';

const router = Router();

router.post('/form/:formId/record', [requestWrapper(async (req: Request, res: Response, next: NextFunction) => {
  const result = await postRecord(
    parseInt(req.params.formId),
    req.body,
    getCountryByReferer(req.header('Referer') as DomainType)
  );

  if(result.status === 200) {
    res.status(result.status).json(req.body);  
  } else {
    res.status(result.status);  
  }  
})]);

router.get('/form/:formId?', [requestWrapper(async (req: Request, res: Response, next: NextFunction) => {
  const result = await getForm(
    parseInt(req.params.formId) || null, 
    getCountryByReferer(req.header('Referer') as DomainType)
  );

  if(result) {
    res.status(200).json(result);  
  } else {
    res.status(404).json({});  
  }
})]);

export default router;
