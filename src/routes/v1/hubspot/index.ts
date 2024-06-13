import { Router } from 'express';
import contactRoutes from './contact';
import listRoutes from './list';

const router = Router();

router.use('/contact', contactRoutes);
router.use('/list', listRoutes);

export default router;
