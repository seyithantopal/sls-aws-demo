import { User } from '@users/types/User';
import { APIGatewayEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import { createUser } from '@users/controllers/createUser.controller';

export const handler = async (
  event: APIGatewayEvent,
  { invokedFunctionArn }: Context,
): Promise<APIGatewayProxyResult> => {
  console.log('createUser lambda');
  const payload: User = JSON.parse(event.body as string);

  const response = await createUser(payload);

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'User created successfully',
      payload: response,
    }),
  };
};
