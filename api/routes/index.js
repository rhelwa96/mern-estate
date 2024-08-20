import {Router} from 'express';
import userRoute from './endpoints/user.route.js'

const routes= Router();
routes.use('/users',userRoute);

export default routes;