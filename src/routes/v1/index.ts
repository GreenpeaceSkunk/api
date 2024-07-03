import { Router } from 'express';
import hubspotRoutes from './hubspot';
import applicationRoutes from './application';
import locationRoutes from './location';
import formaRoutes from './forma';
import campaignRoutes from './campaign';
import paymentgatewayRoutes from './payment-gateway';

const router = Router();

router.use('/hubspot', hubspotRoutes);
router.use('/application', applicationRoutes);
router.use('/location', locationRoutes);
router.use('/forma', formaRoutes);
router.use('/campaign', campaignRoutes);
router.use('/payment-gateway', paymentgatewayRoutes);

export default router;
