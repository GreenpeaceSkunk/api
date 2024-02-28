import { Router, Request, Response, NextFunction } from 'express';
import { refererWrapper, requestWrapper } from '../../../middlewares';
import { postRecord, getForm } from './controller';

const router = Router();

router.post('/form/:formId/record', [refererWrapper, requestWrapper(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {body, params: { formId }} = req;
    const result = await postRecord(formId, body, req.header('Referer'));

    res
      .status(result.status)
      .json(result.body);
  } catch (error: any) {
    res
      .status(500)
      .json({ errorMessage: 'Error when posting new record into ForMa' });
  }
})]);

router.get('/form/:formId?', [refererWrapper, requestWrapper(async (req: Request, res: Response, next: NextFunction) => {
  console.log('Get form')
  
  const result = await getForm(req);

  if(result) {
    res.status(200).json(result);  
  } else {
    res.status(404).json({});  
  }
})]);

export default router;
