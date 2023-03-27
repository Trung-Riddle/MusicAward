import express from "express";
import { usersController } from "../controllers/users.controller";
import { validateRequest } from "../middleware/validation";
import { validatorDto } from "../middleware/validation/validation.dto";
const router = express.Router();

export default (): express.Router => {
  router.post(
    "/create",
    validateRequest(validatorDto.CreateUserDto),
    usersController.createUser
  );

  router.post(
    "/login",
    validateRequest(validatorDto.LoginUserDto),
    usersController.loginUser
  );

  return router;
};
