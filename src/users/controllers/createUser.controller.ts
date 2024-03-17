import { User } from '@users/types/User';
import { executeCreateUserStepFunction } from './executeCreateUserStepFunction';

export const createUser = async (user: User): Promise<User> => {
  if (user.age < 18) {
    throw new Error('This user is not mature enough to be created');
  }

  await executeCreateUserStepFunction(user);

  return new Promise((resolve) => {
    resolve(user);
  });
};
