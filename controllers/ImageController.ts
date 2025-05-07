import express, { Request, Response } from 'express';
import { authMiddleware } from '../middlewares/AuthMiddleware';
import { RequestExtension } from '../types/RequestExtension';
import imageService from '../services/ImageService';
import scriptService from '../services/ScriptService';
import {
    CreateImageDto,
    UpdateImageDto,
    DeleteImageDto,
} from '../types/dtoTypes/ImageDtoTypes';

const router = express.Router();

router.get('/test', async (req, res) => {
    const contentId = '680aedde905b0749bfadd899';
    const scriptsResponse = await scriptService.GetAllByContentId(contentId);
    if (!scriptsResponse.scripts) {
        res.json(scriptsResponse);
        return;
    }
    const result = await imageService.CreateAsync(
        scriptsResponse.scripts,
        '6806b01d72da825df6025312',
        contentId,
        1
    );
    res.json(result);
});

router.get('/getbyscript/:scriptId', authMiddleware, async (req: Request, res: Response) => {
    const { scriptId } = req.params;
    const result = await imageService.GetAllByScriptIdAsync(scriptId);
    res.json(result);
});

router.get('/getallbyuserid', authMiddleware, async (req: Request, res: Response) => {
    const request = req as RequestExtension;
    const result = await imageService.GetAllByUserIdAsync(request.user.userId);
    res.json(result);
});

router.patch('/update/:imageId', authMiddleware, async (req: Request, res: Response) => {
    const request = req as RequestExtension;
    const data = req.body as UpdateImageDto;
    data.imageId = request.params.imageId;
    data.userId = request.user.userId;
    const result = await imageService.UpdateAsync(data);
    res.json(result);
});

router.delete('/delete/:imageId', authMiddleware, async (req: Request, res: Response) => {
    const request = req as RequestExtension;
    const data: DeleteImageDto = {
        imageId: request.params.imageId,
        userId: request.user.userId,
    };
    const result = await imageService.DeleteAsync(data);
    res.json(result);
});

export default router;
