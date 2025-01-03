import express from 'express';
import { protectRoute } from '../middleware/auth.middleware.js';
import { getUsersSidebar } from '../controllers/message.controller.js';
import { getMessages } from '../controllers/message.controller.js';

const router = express.Router();

router.get('/users', protectRoute, getUsersSidebar);
router.get('/:id', protectRoute, getMessages);

export default router;