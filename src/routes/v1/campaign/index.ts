import { Router, Request, Response, NextFunction } from 'express';
import { requestWrapper } from '../../../middlewares';
import { postRecord } from '../forma/controller';
import { sendEmail } from './controller';

const router = Router();

router.post('/:campaignName/sign', [requestWrapper(async (req: Request, res: Response, next: NextFunction) => {
  // const result = await postRecord(parseInt(req.params.formId), req.body);
  const result = await postRecord(parseInt(req.body.form_id), req.body);

  const campaigns = [
    'salva-las-leyes-ambientales'
  ];

  if(result.status === 200) {
    if(campaigns.includes(req.params.campaignName)) {
      sendEmail({
        firstName: req.body.firstName || '',
        lastName: req.body.lastName || '',
        email: req.body.email || '',
      });
    }

    res.status(result.status).json(req.body);  
  } else {
    res.status(result.status);  
  }
})]);

export default router;
