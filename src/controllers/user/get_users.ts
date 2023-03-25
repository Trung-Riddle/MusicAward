import { Request, Response } from 'express';
import User from '../../models/user';
const getUsers = async (req: Request, res: Response) => {
    const users = await User.find();
    res.status(200).json(users);
}
export default getUsers
    