import { Router } from 'express'

export const userRouter = Router();

// middleware that is specific to this router
userRouter.use((req, res, next) => {
  next();
})

userRouter.get('/api/v1/user', (req, res) => {
  res.send('user details')
})

userRouter.patch('/api/v1/users/:id', (req, res) => {
  res.send('Update User')
})
