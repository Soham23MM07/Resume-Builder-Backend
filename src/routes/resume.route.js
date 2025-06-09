import express from "express";
const router = express.Router();
import { ClerkExpressWithAuth } from "@clerk/clerk-sdk-node";
import { upload } from "../middleware/multer.middleware.js";
import {
  createResume,
  getUserResumes,
  getResumeById,
  updateResume,
  deleteResume,
  uploadImage,
} from "../controller/resume.controller.js";

router.get("/resume", ClerkExpressWithAuth(), getUserResumes);
router.post("/resume", ClerkExpressWithAuth(), createResume);
router.get("/resume/:id", ClerkExpressWithAuth(), getResumeById);
router.put("/resume/:id", ClerkExpressWithAuth(), updateResume);
router.delete("/resume/:id", ClerkExpressWithAuth(), deleteResume);
router.post(
  "/resume/uploadimage",
  ClerkExpressWithAuth(),
  upload.fields([
    {
      name: "avatar",
      maxCount: 1,
    },
  ]),
  uploadImage
);
export default router;
