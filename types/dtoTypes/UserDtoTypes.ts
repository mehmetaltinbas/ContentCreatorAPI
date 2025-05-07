export interface SignUpDto {
    userName: string;
    password: string;
}

export interface SignInDto {
    userName: string;
    password: string;
}

export interface UserUpdateDto {
    userId: string;
    userName: string;
    password: string;
}
