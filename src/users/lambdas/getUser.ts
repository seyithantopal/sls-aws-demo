import { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';

export const handler = async (
	event: APIGatewayEvent,
): Promise<APIGatewayProxyResult> => {
	console.log('getUser event: ', event);
	const user = {
		username: 'johndoe',
		email: 'johndoe@acme.com',
	};

	return new Promise((resolve) => {
		resolve({
			statusCode: 200,
			body: JSON.stringify({
				message: 'User fetched successfully',
				payload: user,
			}),
		});
	});
};
