import { Router } from "express";
import { validateSessionCreation, validateSessionUpdate } from "../middleware/sessionValidation.js";
import { getSessionById, getSessions, createSession, updateSession, deleteSession } from "../controllers/sessionController.js";

const router = Router();

// Lettura API - Gestione delle sessioni

//Router per ottenere tutte le sessioni
router.get("/", getSessions);

//Router per ottenere una sessione specifica in base all'id
router.get("/:id", getSessionById);

//Router per aggiornare una sessione specifica in base all'id
router.patch("/:id", validateSessionUpdate, updateSession);

//Router per eliminare una sessione specifica in base all'id
router.delete("/:id", deleteSession);

//Router per creare una nuova sessione
router.post("/", validateSessionCreation, createSession);

export default router;