import jwt, { JwtPayload } from 'jsonwebtoken';
import dotenv from 'dotenv';
import { Request, Response, NextFunction } from 'express';

dotenv.config();

export interface DecodedToken extends JwtPayload {
    userId: string;
}

interface AuthenticatedRequest extends Request {
    user?: DecodedToken;
}

export const authMiddleware = (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction,
) => {
    const token: unknown =
        (req.cookies as { jwt?: string })?.jwt ||
        req.headers.authorization?.split(' ')[1] ||
        '';

    if (!token) {
        res.status(401).json({ isSuccess: false, message: 'Unauthorized: No token provided' });
        return;
    }

    jwt.verify(token as string, process.env.JWT_SIGNATURE as string, (err, decoded) => {
        if (err) {
            res.status(403).json({ isSuccess: false, message: 'Forbidden: Invalid token' });
            return;
        }

        const payload = decoded as DecodedToken;

        if (!payload || !payload.userId) {
            res.status(400).json({
                isSuccess: false,
                message: 'Bad Request: Token missing userId',
            });
            return;
        }

        req.user = payload; // ✅ this now works
        next();
    });
};
