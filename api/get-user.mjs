import { DynamoDBClient, GetItemCommand } from "@aws-sdk/client-dynamodb";

export async function GET(request) {
	try {
		const user = JSON.parse(new URL(request.url).searchParams.get('user'));
		const params = {
			TableName: 'profiles',
			Key: user
		};
		
		const client = new DynamoDBClient({
			region: process.env['AWS_REGION'],
			credentials: {
				accessKeyId: process.env['AWS_ACCESS_KEY_ID'],
				secretAccessKey: process.env['AWS_SECRET_ACCESS_KEY']
			}
		});
		
		const command = new GetItemCommand(params);
		const response = await client.send(command);
		
		if (response.Item) {
			return new Response(JSON.stringify(response.Item));
		} else {
			return new Response(JSON.stringify({ notFound: true }), { status: 200 });
		}
	} catch (error) {
		return new Response(`Error: ${error.message}`, { status: 500 });
	}
}