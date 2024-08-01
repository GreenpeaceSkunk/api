import { Router, Request, Response, NextFunction } from 'express';
import transbankRoutes from './transbank';

const router = Router();

<<<<<<< Updated upstream
router.use('/tranbsbank', transbankRoutes);
=======
router.use('/transbank', transbankRoutes);
>>>>>>> Stashed changes

export default router;
