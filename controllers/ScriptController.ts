import express, { Request, Response } from 'express';
import { authMiddleware } from '../middlewares/AuthMiddleware';
import { RequestExtension } from '../types/RequestExtension';
import ScriptService from '../services/ScriptService';
import ContentService from '../services/ContentService';
import {
    CreateScriptDto,
    UpdateScriptDto,
    DeleteScriptDto,
} from '../types/dtoTypes/ScriptDtoTypes';

const router = express.Router();

router.get('/test', async function (req: Request, res: Response) {
    const getContentResponse = await ContentService.GetByIdAsync('680aedde905b0749bfadd899');
    if (!getContentResponse.content) {
        res.json(getContentResponse);
        return;
    }
    const result = await ScriptService.CreateAsync(
        getContentResponse.content,
        process.env.USER_ID ?? '',
    );
    res.json(result);
});

router.get(
    '/getallbycontentid/:contentId',
    authMiddleware,
    async (req: Request, res: Response) => {
        const { contentId } = req.params;
        const result = await ScriptService.GetAllByContentId(contentId);
        res.json(result);
    },
);

router.get('/getallbyuserid', authMiddleware, async (req: Request, res: Response) => {
    const request = req as RequestExtension;
    const result = await ScriptService.GetAllByUserIdAsync(request.user.userId);
    res.json(result);
});

router.patch('/update/:scriptId', authMiddleware, async (req: Request, res: Response) => {
    const request = req as RequestExtension;
    const data = req.body as UpdateScriptDto;
    data.scriptId = req.params.scriptId;
    data.userId = request.user.userId;
    const result = await ScriptService.UpdateAsync(data);
    res.json(result);
});

router.delete('/delete/:scriptId', authMiddleware, async (req: Request, res: Response) => {
    const request = req as RequestExtension;
    const data: DeleteScriptDto = {
        scriptId: request.params.scriptId,
        userId: request.user.userId,
    };
    const result = await ScriptService.DeleteAsync(data);
    res.json(result);
});

export default router;
