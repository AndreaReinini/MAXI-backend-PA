import { Router } from "express";
import { createJob, getJobs, getJobById, updateJobStatus } from "../controllers/jobController.js";
import { validateJobCreation, validateJobUpdate } from "../middleware/jobValidation.js";

const router = Router();

// Definizione delle rotte per i lavori
router.post("/", validateJobCreation, createJob);

router.get("/", getJobs);

router.get("/:id", getJobById);

router.patch(
    "/:id/status",
    validateJobUpdate,
    updateJobStatus
);

export default router;