import { Router } from 'express';
import v1Routes from './v1';

const router = Router();
router.use('/v1', v1Routes);
// router.use('/contacts', v1ContactsRoutes);

export default router;
