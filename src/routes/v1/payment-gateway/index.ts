import { Router, Request, Response, NextFunction } from 'express';
import transbankRoutes from './transbank';

const router = Router();

router.use('/transbank', transbankRoutes);

export default router;
