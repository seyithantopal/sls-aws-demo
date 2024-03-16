import { saveUser } from '@users/controllers/saveUser.controller';
import { User } from '@users/types/User';
import { APIGatewayEvent, APIGatewayProxyResult, Context } from 'aws-lambda';

export const handler = async (
  event: APIGatewayEvent,
  { awsRequestId, invokedFunctionArn }: Context,
): Promise<APIGatewayProxyResult> => {
  console.log('saveUser event: ', { event, awsRequestId, invokedFunctionArn });
  const payload: User = JSON.parse(event.body as string);

  const savedUser = await saveUser(payload);

  return new Promise((resolve) => {
    resolve({
      statusCode: 200,
      body: JSON.stringify({
        message: 'User saved successfully',
        payload: savedUser,
      }),
    });
  });
};
