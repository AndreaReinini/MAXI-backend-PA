import { Router } from "express";
import { createJob, getJobs, getJobById } from "../controllers/jobController.js";
import {validateJobCreation} from "../middleware/jobValidation.js";

const router = Router();

// Definizione delle rotte per i lavori
router.post("/", validateJobCreation, createJob);

router.get("/", getJobs);

router.get("/:id", getJobById);

export default router;