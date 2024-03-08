export interface User {
	username: { S: string },
	password: { S: string },
	email: { S: string },
	wins: { N: number },
	losses: { N: number },
};