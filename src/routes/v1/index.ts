import { Router } from 'express';
import hubspotRoutes from './hubspot';
import landingRoutes from './landing';

const router = Router();

router.use('/hubspot', hubspotRoutes);
router.use('/landing', landingRoutes);

export default router;
