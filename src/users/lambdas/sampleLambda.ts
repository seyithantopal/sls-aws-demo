import { saveUser } from '@users/controllers/saveUser.controller';
import { User } from '@users/types/User';
import { APIGatewayEvent, APIGatewayProxyResult, Context } from 'aws-lambda';

export const handler = async (
  event: APIGatewayEvent,
): Promise<APIGatewayEvent> => {
  console.log('sampleLambda handler event: ', {
    event,
  });

  return event;
};
