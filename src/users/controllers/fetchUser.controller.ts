import { User } from '@users/types/User';

export const fetchUser = async (id: string): Promise<User | undefined> => {
	const users: User[] = [
		{
			id: '1',
			username: 'johndoe',
			email: 'johndoe@acme.com',
			age: 18,
		},
		{
			id: '2',
			username: 'janedoe',
			email: 'janedoe@acme.com',
			age: 21,
		},
	];
	const user = users.find((u) => u.id === id);
	return new Promise((resolve) => {
		resolve(user);
	});
};
