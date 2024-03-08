import { DynamoDBClient, DeleteItemCommand } from "@aws-sdk/client-dynamodb";

export async function GET(request) {
	try {
		const client = new DynamoDBClient({
			region: process.env['AWS_REGION'],
			credentials: {
				accessKeyId: process.env['AWS_ACCESS_KEY_ID'],
				secretAccessKey: process.env['AWS_SECRET_ACCESS_KEY']
			}
		});
		
		const username = JSON.parse(new URL(request.url).searchParams.get('username'));
		const command = new DeleteItemCommand({
			TableName: 'profiles',
			Key: username
		});
		const response = await client.send(command);
		
		return new Response(JSON.stringify(response));
	} catch (error) {
		return new Response(`Error: ${error.message}`, { status: 500 });
	}
}