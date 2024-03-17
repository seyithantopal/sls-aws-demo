import { User } from '@users/types/User';
import { APIGatewayEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import {
  SFNClient,
  StartExecutionCommand,
  StartExecutionCommandInput,
} from '@aws-sdk/client-sfn';

const parseJson = <T>(body: unknown): T => {
  if (typeof body === 'object') {
    return body as T;
  }
  if (!body || typeof body !== 'string') {
    throw 'The body is empty';
  }
  const jsonObject = JSON.parse(body) as T;
  return jsonObject;
};

export const handler = async (
  event: APIGatewayEvent,
): Promise<APIGatewayProxyResult> => {
  console.log('getUserData lambda: ', event);
  const payload = parseJson<User>(event.body);
  console.log('getUserData lambda: ', payload);

  const stateMachineArn =
    'arn:aws:states:eu-central-1:851725547947:stateMachine:getUserData';

  const params: StartExecutionCommandInput = {
    stateMachineArn,
    input: JSON.stringify(payload),
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
      payload,
    }),
  };
};
