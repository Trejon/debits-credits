import { Router } from 'express'
import { mealsRouter } from './Meals'
import { listRouter } from './Lists'
import { userRouter } from './User'
import { displayTime } from '../utils/time';

export const router = Router();

router.use((req, res, next) => {
  displayTime();
  next();
})

router.get('/', (req, res) => {
  res.send('Hello World');
})

router.use(mealsRouter);
router.use(listRouter);
router.use(userRouter);