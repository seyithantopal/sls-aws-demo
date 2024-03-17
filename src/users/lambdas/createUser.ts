import { createUser } from '@users/controllers/createUser.controller';
import { User } from '@users/types/User';
import { APIGatewayEvent, APIGatewayProxyResult, Context } from 'aws-lambda';

export const handler = async (
  event: APIGatewayEvent,
  { invokedFunctionArn }: Context,
): Promise<APIGatewayProxyResult> => {
  try {
    const payload: User = JSON.parse(event.body as string);

    return new Promise((resolve) => {
      resolve({
        statusCode: 200,
        body: JSON.stringify({
          message: 'User created successfully',
        }),
      });
    });
  } catch (error) {
    return new Promise((resolve) => {
      resolve({
        statusCode: 500,
        body: JSON.stringify({
          message: 'Something went wrong during creating user',
        }),
      });
    });
  }
};
