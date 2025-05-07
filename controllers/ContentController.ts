import express, { Request, Response } from 'express';
import ContentService from '../services/ContentService';
import { RequestExtension } from 'types/RequestExtension';
import { authMiddleware } from '../middlewares/AuthMiddleware';
import PromptService from '../services/PromptService';

const router = express.Router();

router.get('/test', async function (req: Request, res: Response) {
    const getPromptResponse = await PromptService.GetByIdAsync(
        process.env.PROMPT_ID ?? '',
        process.env.USER_ID ?? '',
    );
    if (!getPromptResponse.prompt) {
        res.json(getPromptResponse);
        return;
    }
    const result = await ContentService.CreateAsync(
        getPromptResponse.prompt,
        process.env.USER_ID ?? '',
    );
    res.json(result);
});

router.get(
    '/getallcontentsbyuserid',
    authMiddleware,
    async function (req: Request, res: Response) {
        const request = req as RequestExtension;
        const userId = request.user.userId;
        const result = await ContentService.GetAllByUserIdAsync(userId);
        res.json(result);
    },
);

router.get(
    '/getbyid/:contentId',
    authMiddleware,
    async function (req: Request, res: Response) {
        const request = req as RequestExtension;
        const contentId = request.params.contentId;
        const result = await ContentService.GetByIdAsync(contentId);
        res.json(result);
    },
);

export default router;
