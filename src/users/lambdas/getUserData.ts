import { createUser } from '@users/controllers/createUser.controller';
import { User } from '@users/types/User';
import { APIGatewayEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import AWS from 'aws-sdk';

export const handler = async (
  event: APIGatewayEvent,
  { awsRequestId, invokedFunctionArn }: Context,
): Promise<APIGatewayProxyResult> => {
  try {
    const payload: User = JSON.parse(event.body as string);

    const stepFunctions = new AWS.StepFunctions();

    const stateMachineArn =
      'arn:aws:states:eu-central-1:851725547947:stateMachine:createUserStepFunction';

    const params: AWS.StepFunctions.StartExecutionInput = {
      stateMachineArn,
      input: JSON.stringify(payload),
    };

    await stepFunctions.startExecution(params).promise();

    return new Promise((resolve) => {
      resolve({
        statusCode: 200,
        body: JSON.stringify({
          message: 'User data fetched successfully',
        }),
      });
    });
  } catch (error) {
    console.error('error: ', error);
    return new Promise((resolve) => {
      resolve({
        statusCode: 500,
        body: JSON.stringify({
          message: 'Something went wrong during getting user data',
        }),
      });
    });
  }
};
