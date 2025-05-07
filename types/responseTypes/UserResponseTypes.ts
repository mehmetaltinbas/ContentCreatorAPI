import { ResponseBase } from './ResponseBase';
import { User } from '../entityTypes/UserEntityType';

export interface SignInResponse extends ResponseBase {
    jwt?: string;
}

export interface GetAllUsersResponse extends ResponseBase {
    users?: User[];
}

export interface GetUserResponse extends ResponseBase {
    user?: User;
}
