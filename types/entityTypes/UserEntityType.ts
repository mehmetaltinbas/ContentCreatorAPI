import mongoose from 'mongoose';

export interface User {
    _id: unknown;
    userName: string;
    passwordHash: string;
}
