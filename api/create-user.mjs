import { DynamoDBClient, PutItemCommand } from '@aws-sdk/client-dynamodb';

export async function GET(request) {
	try {
		const user = JSON.parse(new URL(request.url).searchParams.get('user'));
		const params = {
			TableName: 'profiles',
			Item: user
		};
		
		const client = new DynamoDBClient({
			region: process.env['AWS_REGION'],
			credentials: {
				accessKeyId: process.env['AWS_ACCESS_KEY_ID'],
				secretAccessKey: process.env['AWS_SECRET_ACCESS_KEY']
			}
		});
		
		const command = new PutItemCommand(params);
		const response = await client.send(command);
		
		return new Response(JSON.stringify(response));
	} catch (error) {
		return new Response(`Error: ${error.message}`, { status: 500 });
	}
}