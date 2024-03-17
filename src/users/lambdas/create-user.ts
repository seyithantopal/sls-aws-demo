import { User } from '@users/types/User';
import { APIGatewayEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import { createUser } from '@users/controllers/createUser.controller';

type CreateUserStepFunctionInput = {
  id: string;
  username: string;
  email: string;
  age: number;
  isExisted: boolean;
};

export const handler = async (
  event: CreateUserStepFunctionInput,
  { invokedFunctionArn }: Context,
): Promise<CreateUserStepFunctionInput> => {
  const { isExisted, ...user } = event;

  console.log('[create-user] User is being created...', user);

  return event;
};
