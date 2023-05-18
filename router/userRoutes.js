import express from 'express';
import { } from '../controller/userController.js';

import autheticate from './../middleware/authenticate.js';

// router object
const router = express.Router()

// routes
// GET USERS || GET

// 
// UPDATE USER || PUT
router.put('/update-user', autheticate, )

export default router;