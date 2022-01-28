import { Router } from 'express';
import hubspotRoutes from './hubspot';
import applicationRoutes from './application';

const router = Router();

router.use('/hubspot', hubspotRoutes);
router.use('/application', applicationRoutes);

export default router;
