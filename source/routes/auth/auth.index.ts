import express from 'express';
import controllers from '../../controllers/auth/auth.index';
const router = express.Router();

router.post('/login',controllers.jwtLogin);
router.post('/verify',controllers.jwtVerify);
router.post('/refresh', controllers.jwtRefreshToken);
export default router;