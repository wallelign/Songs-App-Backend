import express from "express";
import {
  createSong,
  getSongs,
  getSongById,
  updateSong,
  deleteSong,
  getStats,
} from "../controllers/songController.js";

const router = express.Router();

router.post("/", createSong);
router.get("/", getSongs);
router.get("/statics", getStats);

router.get("/song/:id", getSongById);
router.patch("/update/:id", updateSong);
router.delete("/delete/:id", deleteSong);

export default router;
