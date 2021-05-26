import { Router } from "express";
import autoCatch from "../utils/autoCatch";
import {
  getFamilies,
  createFamily,
  familyMiddleware,
  getFamily,
  patchFamily,
  deleteFamily,
  requests,
  rejectRequest
} from "../services/familyServices";

const router = Router();

router.route("/").get(autoCatch(getFamilies)).post(autoCatch(createFamily));

router.post("/requests/reject",autoCatch(rejectRequest));

router.post("/requests",autoCatch(requests));

router
  .route("/:id")
  .all(autoCatch(familyMiddleware))
  .get(autoCatch(getFamily))
  .patch(autoCatch(patchFamily))
  .delete(autoCatch(deleteFamily));

export default router;
