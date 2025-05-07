import express, { Request, Response } from 'express';
import { authMiddleware } from '../middlewares/AuthMiddleware';
import { RequestExtension } from '../types/RequestExtension';
import videoService from '../services/VideoService';
import {
    CreateVideoDto,
    UpdateVideoDto,
    DeleteVideoDto,
} from '../types/dtoTypes/VideoDtoTypes';

const router = express.Router();

router.get('/getallbyuserid', authMiddleware, async (req: Request, res: Response) => {
    const request = req as RequestExtension;
    const userId = request.user.userId;
    const result = await videoService.GetAllByUserIdAsync(userId);
    res.json(result);
});

router.patch('/update/:videoId', authMiddleware, async (req: Request, res: Response) => {
    const request = req as RequestExtension;
    const data = req.body as UpdateVideoDto;
    data.videoId = req.params.videoId;
    data.userId = request.user.userId;
    const result = await videoService.UpdateAsync(data);
    res.json(result);
});

router.delete('/delete/:videoId', authMiddleware, async (req: Request, res: Response) => {
    const request = req as RequestExtension;
    const result = await videoService.DeleteAsync({
        videoId: req.params.videoId,
        userId: request.user.userId,
    });
    res.json(result);
});

export default router;
