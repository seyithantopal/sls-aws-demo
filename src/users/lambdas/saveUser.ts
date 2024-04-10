import { saveUser } from '@users/controllers/saveUser.controller';
import { User } from '@users/types/User';
import { APIGatewayEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import { connectMongoose } from 'database/db';
import UserModel from 'models/user';

export const handler = async (
  event: APIGatewayEvent,
  { awsRequestId, invokedFunctionArn }: Context,
): Promise<APIGatewayProxyResult> => {
  console.log('saveUser event: ', { event, awsRequestId, invokedFunctionArn });
  const payload: User = JSON.parse(event.body as string);
  try {
    await connectMongoose();
    const savedUser = await UserModel.insertMany([payload]);
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: 'User saved successfully',
        payload: savedUser,
      }),
    };
  } catch (error) {
    return {
      statusCode: 400,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: 'Something went wrong during saving user',
      }),
    };
  }
};
