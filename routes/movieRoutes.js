import express from "express";
const router = express.Router();
import {
  getMovies,
  createMovie,
  updateMovie,
  deleteMovie,
  searchMovies,
  sortMovies,
  uploadImage,
} from "../controllers/movieController.js";
import authenticateToken from "../middleware/authMiddleware.js";
import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

router.get("/", authenticateToken, getMovies);
router.post("/", authenticateToken, createMovie);
router.put("/:id", authenticateToken, updateMovie);
router.delete("/:id", authenticateToken, deleteMovie);
router.get("/search", authenticateToken, searchMovies);
router.get("/sorted", authenticateToken, sortMovies);
router.post("/upload", authenticateToken, upload.single("image"), uploadImage);

export default router;
