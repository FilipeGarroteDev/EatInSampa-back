type UserEntity = {
	id: number;
	name: string;
	email: string;
	password: string;
};

type CreatedUser = Omit<UserEntity, "id">

type LoggedUser = Omit<UserEntity, "id" | "name">

export { UserEntity, CreatedUser, LoggedUser };
