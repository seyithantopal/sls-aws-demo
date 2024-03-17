import {
  SFNClient,
  StartExecutionCommand,
  StartExecutionCommandInput,
} from '@aws-sdk/client-sfn';
import { User } from '@users/types/User';

export const executeCreateUserStepFunction = async (input: User) => {
  const stateMachineArn =
    'arn:aws:states:eu-central-1:851725547947:stateMachine:createUserStepFunction';

  const params: StartExecutionCommandInput = {
    stateMachineArn,
    input: JSON.stringify(input),
  };

  const response = await new SFNClient({
    region: 'eu-central-1',
  })
    .send(new StartExecutionCommand(params))
    .catch((res) => console.log('error is occured: ', res));
  console.log(response);
};
