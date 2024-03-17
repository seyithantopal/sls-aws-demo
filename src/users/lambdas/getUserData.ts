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
  console.log('getUserData lambda');
  const payload: User = JSON.parse(event.body as string);

  const stateMachineArn =
    'arn:aws:states:eu-central-1:851725547947:stateMachine:createUserStepFunction';

  const params: StartExecutionCommandInput = {
    stateMachineArn,
    input: JSON.stringify({ id: '2' }),
  };

  const response = await new SFNClient({
    region: 'eu-central-1',
  })
    .send(new StartExecutionCommand(params))
    .catch((res) => console.log('error is occured: ', res));
  console.log(response);

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'User data fetched successfully',
      payload: response,
    }),
  };
};
