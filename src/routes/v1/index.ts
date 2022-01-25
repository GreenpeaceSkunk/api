import { Router } from 'express';
import contactRoutes from './contacts';

const router = Router();
router.use('/contact', contactRoutes);

export default router;
