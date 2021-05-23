import { Router } from "express";
import autoCatch from "../utils/autoCatch";
import {
  getAllUsers,
  createUser,
  getUser,
  patchUser,
  deleteUser,
  userMiddleware
} from "../services/userServices";

const router = Router();

router.route("/").get(autoCatch(getAllUsers)).post(autoCatch(createUser));

router
  .route("/:id")
  .all(autoCatch(userMiddleware))
  .get(autoCatch(getUser))
  .patch(autoCatch(patchUser))
  .delete(autoCatch(deleteUser));

export default router;
