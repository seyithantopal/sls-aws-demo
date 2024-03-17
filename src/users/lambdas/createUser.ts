import { saveUser } from '@users/controllers/saveUser.controller';
import { User } from '@users/types/User';
import { APIGatewayEvent, APIGatewayProxyResult, Context } from 'aws-lambda';

type CreateUserStepFunctionInput = {
  id: string;
  username: string;
  email: string;
  age: number;
};

export const handler = async (
  event: CreateUserStepFunctionInput,
): Promise<CreateUserStepFunctionInput> => {
  console.log('createUser handler event: ', {
    event,
  });

  return event;
};
