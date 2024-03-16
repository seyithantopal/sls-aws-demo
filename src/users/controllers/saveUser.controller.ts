import { User } from '@users/types/User';

export const saveUser = async (user: User): Promise<User> => {
  return new Promise((resolve) => {
    resolve(user);
  });
};
