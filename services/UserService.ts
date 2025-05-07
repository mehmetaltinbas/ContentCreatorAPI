import { entities } from '../data/db';
import { errorHandler } from '../utilities/ErrorHandler';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { SignUpDto, SignInDto, UserUpdateDto } from '../types/dtoTypes/UserDtoTypes';
import { ResponseBase } from '../types/responseTypes/ResponseBase';
import {
    GetAllUsersResponse,
    GetUserResponse,
    SignInResponse,
} from 'responseTypes/UserResponseTypes';

const SignUpAsync = errorHandler(async function UserService_SignUpAsync(
    data: SignUpDto,
): Promise<ResponseBase> {
    const { password, ...userData } = data;
    const passwordHash = await bcrypt.hash(password, 10);
    await entities.User.create({
        passwordHash: passwordHash,
        ...userData,
    });
    return { isSuccess: true, message: 'signed up' };
});

const SignInAsync = errorHandler(async function UserService_SignInAsync(
    data: SignInDto,
): Promise<SignInResponse> {
    const user = await entities.User.findOne({
        userName: data.userName,
    });
    if (!user) return { isSuccess: true, message: 'wrong username' };
    const passwordComparison = await bcrypt.compare(data.password, user.passwordHash);
    if (!passwordComparison) return { isSuccess: false, message: 'wrong password' };
    const jwtSecret = process.env.JWT_SIGNATURE;
    if (!jwtSecret) throw new Error('JWT_SIGNATURE is not defined.');
    const token = jwt.sign(
        {
            userId: user._id,
        },
        jwtSecret,
        {
            expiresIn: '1h',
        },
    );
    return {
        isSuccess: true,
        message: 'signed in',
        jwt: token,
    };
});

const AuthorizeAsync = errorHandler(async function UserService_AuthorizeAsync(
    userId: string,
): Promise<ResponseBase> {
    const user = await entities.User.findById({
        _id: userId,
    });
    if (!user) return { isSuccess: false, message: 'user authorized but not found' };
    return { isSuccess: true, message: 'user verified' };
});

const GetAllAsync = errorHandler(
    async function UserService_GetAllAsync(): Promise<GetAllUsersResponse> {
        const users = await entities.User.find();
        if (users.length === 0) return { isSuccess: false, message: "users couldn't read" };
        return { isSuccess: true, message: 'users read', users };
    },
);

const GetByIdAsync = errorHandler(async function UserService_GetByIdAsync(
    userId: string,
): Promise<GetUserResponse> {
    const user = await entities.User.findById(userId);
    if (!user) return { isSuccess: false, message: "user couldn't read" };
    return { isSuccess: true, message: 'user read', user };
});

const UpdateAsync = errorHandler(async function UserService_UpdateAsync(
    data: UserUpdateDto,
): Promise<ResponseBase> {
    const { userId, password, ...updateFields } = data;
    const passwordHash = bcrypt.hashSync(password, 10);
    const updatedUser = await entities.User.findByIdAndUpdate(
        userId,
        {
            passwordHash: passwordHash,
            ...updateFields,
        },
        { new: true },
    );
    if (!updatedUser) return { isSuccess: false, message: "user coldn't updated" };
    return { isSuccess: true, message: 'user updated' };
});

const DeleteAsync = errorHandler(async function UserService_DeleteAasync(
    userId: string,
): Promise<ResponseBase> {
    const deletedUser = await entities.User.findByIdAndDelete({ _id: userId });
    if (!deletedUser) return { isSuccess: false, message: "user couldn't deleted" };
    return { isSuccess: true, message: 'user deleted' };
});

export default {
    SignUpAsync,
    SignInAsync,
    AuthorizeAsync,
    GetAllAsync,
    GetByIdAsync,
    UpdateAsync,
    DeleteAsync,
};
