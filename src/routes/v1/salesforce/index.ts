import { Router, Request, Response, NextFunction } from 'express';
import { createDonation, generatePayment, getSession } from './controller';

const router = Router();

export const sessionWrapper = async (req: Request, res: Response, next: NextFunction) => {
  await getSession();
  next();
};

router.post(
  '/create-donation', 
  [
    sessionWrapper,
    async (req: Request, res: Response, next: NextFunction) => {
      const response = await createDonation(req.query.token as string);

      if(response.error) {
        return res.status(400).json(response);
      }
      
      res.status(201).json(response);
    },
  ]
);

router.post(
  '/generate-payment',
  [
    // authWrapper,
    async (req: Request, res: Response, next: NextFunction) => {
      // const schema = generatePaymentSchema.validate(req.body);
    
      // if(schema['error']) {
      //   return res.status(400).json({
      //     error: true,
      //     message: schema.error.details[0].message,
      //     valids: schema.error.details[0].context,
      //   }); 
      // }

      // const result = await generatePayment(schema.value);
      const result = await generatePayment(req.body);
      res.status(201).json(result);
      // res.json(await authorize({}));
    },
  ],
);

export default router;
