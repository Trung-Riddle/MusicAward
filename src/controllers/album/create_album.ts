import { Request, Response } from "express"
import Album,{ IAlbum } from "../../models/album"

export const createAlbum = async (req: Request, res: Response) => {
    try {
        const { ...albums }: IAlbum = req.body
        const album = await Album.create({ ...albums })
        return res.status(201).json(album)
    } catch (err) {
        return res.status(500).json({errorMessage: err})
    }
}