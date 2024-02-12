import { Router } from 'express';
import hubspotRoutes from './hubspot';
import applicationRoutes from './application';
import locationRoutes from './location';
import formaRoutes from './forma';
import campaignRoutes from './campaign';

const router = Router();

router.use('/hubspot', hubspotRoutes);
router.use('/application', applicationRoutes);
router.use('/location', locationRoutes);
router.use('/forma', formaRoutes);
router.use('/campaign', campaignRoutes);

export default router;
