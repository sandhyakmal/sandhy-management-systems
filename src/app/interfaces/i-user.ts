export interface IUser {
    id: number;
    firstName: string;
    maidenName?: string;
    lastName: string;
    gender: string;
    email: string;
    phone: string;
    birthDate?: Date;
    username?: string;
    password?: string;
}

export interface IUserWrapper{
    users: Array<IUser>;
    total: number;
    skip: number;
    limit: number;
}