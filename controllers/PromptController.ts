import express, { Request, Response } from 'express';
import { RequestExtension } from '../types/RequestExtension';
import promptService from '../services/PromptService';
import { authMiddleware, DecodedToken } from '../middlewares/AuthMiddleware';
import {
    CreatePromptDto,
    UpdatePromptDto,
    DeletePromptDto,
} from '../types/dtoTypes/PromptDtoTypes';

const router = express.Router();

router.get('/getallbyuserid', authMiddleware, async function (req: Request, res: Response) {
    const request = req as RequestExtension;
    const userId = request.user.userId;
    const result = await promptService.GetAllByUserIdAsync(userId);
    res.json(result);
});

router.get('/getbyid/:promptId', authMiddleware, async function (req: Request, res: Response) {
    const request = req as RequestExtension;
    const promptId = request.params.promptId;
    const userId = request.user.userId;
    const result = await promptService.GetByIdAsync(promptId, userId);
    res.json(result);
});

router.patch(
    '/update/:promptId',
    authMiddleware,
    async function (req: Request, res: Response) {
        const request = req as RequestExtension;
        const data = request.body as UpdatePromptDto;
        data.promptId = request.params.promptId;
        data.userId = request.user.userId;
        const result = await promptService.UpdateAsync(data);
        res.json(result);
    },
);

router.delete(
    '/delete/:promptId',
    authMiddleware,
    async function (req: Request, res: Response) {
        const request = req as RequestExtension;
        const data: DeletePromptDto = {
            promptId: request.params.promptId,
            userId: request.user.userId,
        };
        const result = await promptService.DeleteAsync(data);
        res.json(result);
    },
);

export default router;
