import {Router} from 'express';
import userRoute from './endpoints/user.route.js'
import authRoute from './endpoints/auth.route.js'

const routes= Router();
routes.use('/users',userRoute);
routes.use('/auth',authRoute);

export default routes;