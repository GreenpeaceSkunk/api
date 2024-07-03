import { Router, Request, Response, NextFunction } from 'express';
import transbankRoutes from './transbank';

const router = Router();

router.use('/tranbsbank', transbankRoutes);

export default router;
