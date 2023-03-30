import { Router } from 'express'
import { mealsRouter } from './meals-api'
import { listRouter } from './lists-api'
import { userRouter } from './user-api'
import { internalRouter } from './internal-api'
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
router.use(internalRouter);