import { fetchUser } from '@users/controllers/fetchUser.controller';
// import { User } from '@users/types/User';
import { APIGatewayEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import { connectMongoose } from 'database/db';
import User from 'models/user';

type PathParameters = {
  id: string;
};

export const handler = async (
  event: APIGatewayEvent,
  ctx: Context,
): Promise<APIGatewayProxyResult> => {
  // console.log('getUser event: ', { event, awsRequestId, invokedFunctionArn });
  ctx.callbackWaitsForEmptyEventLoop = false;
  const userId = (event.pathParameters as unknown as PathParameters).id;
  try {
    await connectMongoose();
    const fetchedUser = await User.find({ _id: userId }).exec();
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: 'User fetched successfully',
        payload: fetchedUser,
      }),
    };
  } catch (error) {
    return {
      statusCode: 400,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: 'Something went wrong during fetching user',
      }),
    };
  }
};
