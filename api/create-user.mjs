import { DynamoDBClient, PutItemCommand } from '@aws-sdk/client-dynamodb';

export async function GET(request) {
	try {
		const client = new DynamoDBClient({
			region: process.env['AWS_REGION'],
			credentials: {
				accessKeyId: process.env['AWS_ACCESS_KEY_ID'],
				secretAccessKey: process.env['AWS_SECRET_ACCESS_KEY']
			}
		});
		
		const user = JSON.parse(new URL(request.url).searchParams.get('user'));
		const command = new PutItemCommand({
			TableName: 'profiles',
			Item: user,
			ConditionExpression: 'attribute_not_exists(username)'
		});
		const response = await client.send(command);
		
		return new Response(JSON.stringify(response));
	} catch (error) {
		if (error.message == 'The conditional request failed') {
			return new Response(JSON.stringify({ userAlreadyExists: true }), { status: 200 });
		}
		return new Response(`Error: ${error.message}`, { status: 500 });
	}
}