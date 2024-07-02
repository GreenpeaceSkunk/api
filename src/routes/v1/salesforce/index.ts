import { Router, Request, Response, NextFunction } from 'express';
import { authWrapper } from '../../../middlewares';
import { createDonationSchema, generatePaymentSchema } from './schema';
import { createDonation, generatePayment } from './controller';

const router = Router();

router.post(
  '/create-donation', [
  authWrapper,
  async (req: Request, res: Response, next: NextFunction) => {
    const schema = createDonationSchema.validate(req.body);
    
    if(schema['error']) {
      return res.status(400).json({
        error: true,
        message: schema.error.details[0].message,
        valids: schema.error.details[0].context,
      }); 
    }

    const result = await createDonation(schema.value);
    res.status(201).json(result);
  }
]);

router.post(
  '/generate-payment', [
    authWrapper,
    async (req: Request, res: Response, next: NextFunction) => {
      const schema = generatePaymentSchema.validate(req.body);
    
      if(schema['error']) {
        return res.status(400).json({
          error: true,
          message: schema.error.details[0].message,
          valids: schema.error.details[0].context,
        }); 
      }

      const result = await generatePayment(schema.value);
      res.status(201).json(result);
    }
  ]);

export default router;
