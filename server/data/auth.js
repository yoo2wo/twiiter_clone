//abcd1234
let users = [
	{
		id: '1',
		username: 'bob',
		password: '$2b$12$ap483OJDU0CPIBoJFxNbGue5kTQ635jGjbq.HQj8SU9g6LjasgwKe',
		name: 'Bob',
		email: 'bob@gmail.com'
	}
];

export async function findByUsername(username) {
	return users.find((user)=> user.username === username);
}

export async function createUser(user){
	const created = { ...user, id: Date.now().toString()};
	users.push(created);
	return created.id;
}
