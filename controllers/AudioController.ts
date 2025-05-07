import express, { Request, Response } from 'express';
import { authMiddleware } from '../middlewares/AuthMiddleware';
import { RequestExtension } from '../types/RequestExtension';
import audioService from '../services/AudioService';
import {
    CreateAudioDto,
    UpdateAudioDto,
    DeleteAudioDto,
} from '../types/dtoTypes/AudioDtoTypes';

const router = express.Router();

router.get('/getbyscript/:scriptId', authMiddleware, async (req: Request, res: Response) => {
    const { scriptId } = req.params;
    const result = await audioService.GetAllByScriptIdAsync(scriptId);
    res.json(result);
});

router.get('/getallbyuserid', authMiddleware, async (req: Request, res: Response) => {
    const request = req as RequestExtension;
    const result = await audioService.GetAllByUserIdAsync(request.user.userId);
    res.json(result);
});

router.patch('/update/:audioId', authMiddleware, async (req: Request, res: Response) => {
    const request = req as RequestExtension;
    const data = req.body as UpdateAudioDto;
    data.audioId = request.params.audioId;
    data.userId = request.user.userId;
    const result = await audioService.UpdateAsync(data);
    res.json(result);
});

router.delete('/delete/:audioId', authMiddleware, async (req: Request, res: Response) => {
    const request = req as RequestExtension;
    const data: DeleteAudioDto = {
        audioId: req.params.audioId,
        userId: request.user.userId,
    };
    const result = await audioService.DeleteAsync(data);
    res.json(result);
});

export default router;
