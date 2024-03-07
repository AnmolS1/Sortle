export interface User {
	username: { S: string },
	password: { S: string },
	email: { S: string },
	wins: { N: string },
	losses: { N: string },
};