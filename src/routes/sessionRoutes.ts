import { Router } from "express";
import { validateSessionCreation, validateSessionUpdate } from "../middleware/sessionValidation.js";

const router = Router();


// TEMPORANEO - Memoria temporanea per le sessioni. NON PERSISTENTE.

// Definiamo l'interfaccia per la sessione
interface Session {
  id: number;
  name: string;
  status: string;
}

//Memoria temporanea per le sessioni. NON PERSISTENTE.
const sessions: Session[] = [];
let nextSessionId = 1;

//Router per ottenere tutte le sessioni
router.get("/", (req, res) => {
  res.json(sessions);
});

//Router per ottenere una sessione specifica in base all'id
router.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  const session = sessions.find((session) => session.id === id);
  if (!session) {
    return res.status(404).json({ message: "Session not found" });
  }
  res.json(session);
});

//Router per creare una nuova sessione
router.post("/", validateSessionCreation, (req, res) => {
  const { name } = req.body;
  const newSession: Session = {
    id: nextSessionId++,
    name: name,
    status: "ACTIVE"
  };
  sessions.push(newSession);
  res.status(201).json(newSession);
});

//Router per aggiornare una sessione specifica in base all'id
router.patch("/:id", validateSessionUpdate, (req, res) => {
  const id = Number(req.params.id);
  const session = sessions.find((session) => session.id === id);
  if (!session) {
    return res.status(404).json({ message: "Session not found" });
  }
  session.name = req.body.name.trim();
  res.json(session);
});

//Router per eliminare una sessione specifica in base all'id
router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);
  const sessionIndex = sessions.findIndex((session) => session.id === id);
  if (sessionIndex === -1) {
    return res.status(404).json({ message: "Session not found" });
  }
  sessions.splice(sessionIndex, 1);
  res.status(204).send();
});

export default router;