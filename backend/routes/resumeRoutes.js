import { Router } from "express";
import auth from "../middleware/auth.js";
import {
  createResume,
  deleteResume,
  getResume,
  getResumes,
  updateResume
} from "../controllers/resumeController.js";

const router = Router();

router.use(auth);
router.get("/", getResumes);
router.post("/", createResume);
router.get("/:id", getResume);
router.put("/:id", updateResume);
router.delete("/:id", deleteResume);

export default router;
