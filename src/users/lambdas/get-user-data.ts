import { saveUser } from '@users/controllers/saveUser.controller';
import { User } from '@users/types/User';
import { APIGatewayEvent, APIGatewayProxyResult, Context } from 'aws-lambda';

type CreateUserStepFunctionInput = {
  id: string;
  username: string;
  email: string;
  age: number;
  isExisted: boolean;
};

export const handler = async (
  event: CreateUserStepFunctionInput,
): Promise<CreateUserStepFunctionInput> => {
  console.log('get-user-data handler event: ', {
    event,
  });

  return {
    ...event,
    isExisted: true,
  };
};
