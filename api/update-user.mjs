import { DynamoDBClient, UpdateItemCommand } from "@aws-sdk/client-dynamodb";
import { marshall } from "@aws-sdk/util-dynamodb";

export async function GET(request) {
	try {
		const client = new DynamoDBClient({
			region: process.env['AWS_REGION'],
			credentials: {
				accessKeyId: process.env['AWS_ACCESS_KEY_ID'],
				secretAccessKey: process.env['AWS_SECRET_ACCESS_KEY']
			}
		});
		
		const searchParams = new URL(request.url).searchParams
		const username = JSON.parse(searchParams.get('username'));
		const column = searchParams.get('column');
		var value = searchParams.get('value');
		
		if (column == 'wins' || column == 'losses') {
			value = Number(value);
		}
		
		const command = new UpdateItemCommand({
			TableName: 'profiles',
			Key: username,
			UpdateExpression: `set ${column} = :${column}`,
			ExpressionAttributeValues: marshall({
				[`:${column}`]: value
			}),
			ReturnValues: "ALL_NEW"
		});
		const response = await client.send(command);
		return new Response(JSON.stringify(response));
	} catch (error) {
		return new Response(`Error: ${error.message}`, { status: 500 });
	}
}