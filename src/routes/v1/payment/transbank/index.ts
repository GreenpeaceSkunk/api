import { Router, Request, Response, NextFunction } from 'express';
import { refererWrapper, requestWrapper } from '../../../../middlewares';



const router = Router();

router.post('/create', [refererWrapper, requestWrapper(async (req: Request, res: Response, next: NextFunction) => {
  // try {
    const {body, params: { paymentGateway }} = req;
    // const result = await postRecord(formId, body, req.header('Referer'));

    res
      // .status(result.status)
      .status(200)
      .json({
        message: 'payment'
      });
  // } catch (error: any) {
  //   res
  //     .status(500)
  //     .json({ errorMessage: 'Error when posting new record into ForMa' });
  // }
})]);

export default router;
