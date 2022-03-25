import { Router } from 'express';
import hubspotRoutes from './hubspot';
import applicationRoutes from './application';
import formaRoutes from './forma';

const router = Router();

router.use('/hubspot', hubspotRoutes);
router.use('/application', applicationRoutes);
router.use('/forma', formaRoutes);

export default router;
