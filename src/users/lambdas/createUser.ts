import { User } from '@users/types/User';
import { APIGatewayEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import {
  SFNClient,
  StartExecutionCommand,
  StartExecutionCommandInput,
} from '@aws-sdk/client-sfn';

export const handler = async (
  event: APIGatewayEvent,
  { invokedFunctionArn }: Context,
): Promise<APIGatewayProxyResult> => {
  console.log('createUser lambda');
  // const payload: User = JSON.parse(event.body as string);

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'User created successfully',
    }),
  };
};
