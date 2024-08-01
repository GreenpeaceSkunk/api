import { Router } from 'express';
import hubspotRoutes from './hubspot';
import applicationRoutes from './application';
import locationRoutes from './location';
import formaRoutes from './forma';
import campaignRoutes from './campaign';
import paymentGatewayRoutes from './payment-gateway';
import salesforceRoutes from './salesforce';

const router = Router();

router.use('/hubspot', hubspotRoutes);
router.use('/application', applicationRoutes);
router.use('/location', locationRoutes);
router.use('/forma', formaRoutes);
router.use('/campaign', campaignRoutes);
router.use('/payment-gateway', paymentGatewayRoutes);
router.use('/salesforce', salesforceRoutes);

export default router;
