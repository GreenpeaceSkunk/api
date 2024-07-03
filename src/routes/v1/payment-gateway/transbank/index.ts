import { Router, Request, Response, NextFunction } from 'express';
import { refererWrapper, requestWrapper } from '../../../../middlewares';
import { create } from './conroller';

const router = Router();

/**
 * Ref: https://www.transbankdevelopers.cl/referencia/oneclick#crear-una-inscripcion
 */
router.get('/create', [refererWrapper, requestWrapper(async (req: Request, res: Response, next: NextFunction) => {
  // const response = await create();
  // try {
    // const {body, params: { paymentGateway }} = req;
    // const result = await postRecord(formId, body, req.header('Referer'));

    res
      // .status(result.status)
      .status(200)
      .json({});
  // } catch (error: any) {
  //   res
  //     .status(500)
  //     .json({ errorMessage: 'Error when posting new record into ForMa' });
  // }
})]);

export default router;
