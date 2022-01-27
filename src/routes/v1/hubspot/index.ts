import { Router } from 'express';
import contactRoutes from './contact';

const router = Router();

router.use('/contact', contactRoutes);

export default router;
