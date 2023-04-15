import { redisGetAsync } from "../../services/cache-redis";

export const validateUserIsLoggedIn = async (req: any, res: any, next: any) => {
  const user = await redisGetAsync('user');
  if (!user) return false;
  return true;
}