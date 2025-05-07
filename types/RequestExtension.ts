import { Request } from 'express';
import { DecodedToken } from '../middlewares/AuthMiddleware';

export interface RequestExtension extends Request {
    user: DecodedToken;
}
