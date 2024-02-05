import { fetchUser } from '@users/controllers/fetchUser.controller';
import { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';

type PathParameters = {
	id: string;
};

export const handler = async (
	event: APIGatewayEvent,
): Promise<APIGatewayProxyResult> => {
	console.log('getUser event: ', event);

	const userId = (event.pathParameters as unknown as PathParameters).id;

	const fetchedUser = await fetchUser(userId);

	return new Promise((resolve) => {
		resolve({
			statusCode: 200,
			body: JSON.stringify({
				message: 'User fetched successfully',
				payload: fetchedUser,
			}),
		});
	});
};
