import express, { Request, Response } from 'express';
import { RequestExtension } from '../types/RequestExtension';
import userService from '../services/UserService';
import { authMiddleware, DecodedToken } from '../middlewares/AuthMiddleware';
import { SignInDto, SignUpDto, UserUpdateDto } from '../types/dtoTypes/UserDtoTypes';

const router = express.Router();

router.post(
    '/signup',
    async function (req: Request<unknown, unknown, SignUpDto>, res: Response) {
        const data = req.body;
        const result = await userService.SignUpAsync(data);
        res.json(result);
    },
);

router.post(
    '/signin',
    async function (req: Request<unknown, unknown, SignInDto>, res: Response) {
        const data = req.body;
        const result = await userService.SignInAsync(data);
        res.json(result);
    },
);

router.post('/signout', authMiddleware, async function (req: Request, res: Response) {
    res.clearCookie('jwt', { httpOnly: true, secure: true, sameSite: 'strict' });
    res.json({ isSuccess: true, message: 'Signed out successfuly' });
});

router.get('/authorize', authMiddleware, async function (req: Request, res: Response) {
    const request = req as RequestExtension;
    const userId = request.user.userId;
    const result = await userService.AuthorizeAsync(userId);
    res.json(result);
});

router.get('/getall', async function (req: Request, res: Response) {
    const result = await userService.GetAllAsync();
    res.json(result);
});

router.get('/getbyid/:userId', async function (req: Request, res: Response) {
    const userId = req.params.userId;
    const result = await userService.GetByIdAsync(userId);
    res.json(result);
});

router.patch('/update', authMiddleware, async function (req: Request, res: Response) {
    const request = req as RequestExtension;
    const data = request.body as UserUpdateDto;
    data.userId = request.user.userId;
    const result = await userService.UpdateAsync(data);
    res.json(result);
});

router.delete('/delete', authMiddleware, async function (req: Request, res: Response) {
    const request = req as RequestExtension;
    const userId = request.user.userId;
    const result = await userService.DeleteAsync(userId);
    res.json(result);
});

export default router;
