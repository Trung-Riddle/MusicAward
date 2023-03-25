import { Router } from 'express'
import { getUsers, createUser, } from '../../controllers/user';

const router = Router();

router.get('/', getUsers);
// router.get('/:id', getUserById);
router.post('/', createUser);
// router.put('/:id', updateUser);
// router.delete('/:id', deleteUser);

export default router;
