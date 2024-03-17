import { User } from '@users/types/User';
import { APIGatewayEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import {
  SFNClient,
  StartExecutionCommand,
  StartExecutionCommandInput,
} from '@aws-sdk/client-sfn';

export const handler = async (
  event: APIGatewayEvent,
): Promise<APIGatewayProxyResult> => {
  try {
    const payload: User = JSON.parse(event.body as string);

    const stateMachineArn =
      'arn:aws:states:eu-central-1:851725547947:stateMachine:createUserStepFunction';

    const params: StartExecutionCommandInput = {
      stateMachineArn,
      input: JSON.stringify(payload),
    };

    const response = await new SFNClient({}).send(
      new StartExecutionCommand(params),
    );
    console.log(response);

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'User data fetched successfully',
        payload: response,
      }),
    };
  } catch (error) {
    console.error('error: ', error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'Something went wrong during getting user data',
      }),
    };
  }
};
