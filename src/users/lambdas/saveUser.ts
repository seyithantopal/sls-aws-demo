import { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';

export const handler = async (
	event: APIGatewayEvent,
): Promise<APIGatewayProxyResult> => {
	console.log('saveUser event: ', event);
	return new Promise((resolve) => {
		resolve({
			statusCode: 200,
			body: JSON.stringify({ message: 'User saved successfully' }),
		});
	});
};
