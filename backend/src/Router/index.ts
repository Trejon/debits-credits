import Router from 'express-promise-router'
import { transactionsRouter } from './transactions-api'
import { accountsRouter } from './accounts-api'
import { userRouter } from './user-api'
import { budgetRouter } from './budgets-api'
import { internalRouter } from './internal-api'
import { displayTime } from '../utils/time';
import { redisClient } from '../../cache-redis/index'

export const router = Router();

router.use((req, res, next) => {
  displayTime();
  next();
})

router.get('/', (req, res) => {
  console.log("req.session", req.session)
  // const sess = req.session;
  // if (sess.username) {
  //   if (sess.username) {
  //     res.write(`<h1>Welcome ${sess.username} </h1><br>`)
  //     res.write(
  //       `<h3>This is the Home page</h3>`
  //     );
  //     res.end('<a href=' + '/logout' + '>Click here to log out</a >')
  //     res.write("You have logged in")
  //   }
  // } else {
  //   // res.sendFile(__dirname + "/login.html")
  //   //   //send to login
  //   res.write("You need to login before you can interact with this api.")
  //   // res.redirect('/login')
  // }
})



router.use(transactionsRouter);
router.use(accountsRouter);
router.use(budgetRouter)
router.use(userRouter);
router.use(internalRouter);