import { Router } from 'express';
import { getOrders } from '../controllers/ordersController';

const router = Router();
router.get('/', getOrders);
router.post('/');
router.patch('/:id');
router.delete('/:id');

export default router;