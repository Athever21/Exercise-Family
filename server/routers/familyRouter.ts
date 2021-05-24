import { Router } from "express";
import autoCatch from "../utils/autoCatch";
import {
  getFamilies,
  createFamily,
  familyMiddleware,
  getFamily,
  patchFamily,
  deleteFamily
} from "../services/familyServices";

const router = Router();

router.route("/").get(autoCatch(getFamilies)).post(autoCatch(createFamily));

router
  .route("/:id")
  .all(autoCatch(familyMiddleware))
  .get(autoCatch(getFamily))
  .patch(autoCatch(patchFamily))
  .delete(autoCatch(deleteFamily));

export default router;
