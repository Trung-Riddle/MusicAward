import { Router, Request, Response } from 'express'
import { getAlbum, getAllAlbum } from '../../controllers/album';
const router = Router();


router.get("/:id", getAlbum, (req: Request, res: Response) => {
    res.json(res.locals.album);
});
router.get("/", getAllAlbum)

