import { Router } from "express";
import { createJob, getJobs, getJobById, updateJobStatus, completeJob } from "../controllers/jobController.js";
import { validateJobCompletion, validateJobCreation, validateJobUpdate } from "../middleware/jobValidation.js";

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

router.patch(
    "/:id/complete",
    validateJobCompletion,
    completeJob
);

export default router;