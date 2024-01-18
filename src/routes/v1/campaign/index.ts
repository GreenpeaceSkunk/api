import { Router, Request, Response, NextFunction } from 'express';
import { requestWrapper } from '../../../middlewares';
import { sign } from './controller';



const router = Router();

router.post('/:campaignName/sign', [requestWrapper(async (req: Request, res: Response, next: NextFunction) => {
  const result = await sign(req.body, req.params.campaignName, req.query.form_id, req.query.hb_campaign_field);

  if(result.ok) {
    res.status(200).json({
      message: result.message,
    });
  } else {
    res.status(500).json({
      errorMessage: result.message,
    });
  }
})]);

export default router;
