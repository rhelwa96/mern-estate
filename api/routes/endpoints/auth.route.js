import { Router } from 'express';
import * as controller from '../../controllers/auth.controller.js'

const router = Router();
router.post('/signup',controller.SignUp);
router.post('/signin',controller.SignIn)

export default router;