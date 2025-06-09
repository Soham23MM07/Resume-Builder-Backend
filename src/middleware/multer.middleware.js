// src/middleware/multer.middleware.js
import multer from "multer";

// ✅ Use memory storage (no disk write)
const storage = multer.memoryStorage();

// ✅ Optional file filter
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed!"), false);
  }
};

export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
});
