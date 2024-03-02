import { Injectable } from '@angular/core';
import * as AWS from 'aws-sdk';

@Injectable({
	providedIn: 'root'
})
export class ProfileService {
	private accessKeyId: string = process.env['AWS_ACCESS_KEY_ID'] ? process.env['AWS_ACCESS_KEY_ID'] : '';
	private secretAccessKey: string = process.env['AWS_SECRET_ACCESS_KEY'] ? process.env['AWS_SECRET_ACCESS_KEY'] : '';
	
	private dynamoDB = new AWS.DynamoDB({
		region: 'us-east-2',
		credentials: {
			accessKeyId: this.accessKeyId,
			secretAccessKey: this.secretAccessKey,
		},
	});
	
	async addUser(user: any): Promise<any> {
		console.log(process);
		console.log(process.env);
		console.log(this.accessKeyId);
		console.log(this.secretAccessKey);
		
		const params = {
			TableName: 'profiles',
			Item: user
		};
		
		try {
			const response = await this.dynamoDB.putItem(params).promise();
			console.log('successfully added user:', response);
			return response;
		} catch (error) {
			console.error('error adding user:', error);
			throw error;
		}
	}
}