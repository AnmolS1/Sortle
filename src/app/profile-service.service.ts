import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import * as AWS from 'aws-sdk';

@Injectable({
	providedIn: 'root'
})
export class ProfileService {
	private region: string = environment.AWS_REGION || '';
	private accessKeyId: string = environment.AWS_ACCESS_KEY_ID || '';
	private secretAccessKey: string = environment.AWS_SECRET_ACCESS_KEY || '';
	
	private dynamoDB = new AWS.DynamoDB({
		region: this.region,
		credentials: {
			accessKeyId: this.accessKeyId,
			secretAccessKey: this.secretAccessKey,
		},
	});
	
	async addUser(user: any): Promise<any> {
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