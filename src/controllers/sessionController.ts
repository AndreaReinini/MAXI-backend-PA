import type { Request, Response } from "express";

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

// Funzione per ottenere tutte le sessioni
export function getSessions(req: Request, res: Response) {
    res.json(sessions);
}

export function getSessionById(req: Request, res: Response) {
    const id = Number(req.params.id);
    const session = sessions.find((session) => session.id === id);
    if (!session) {
        return res.status(404).json({ message: "Session not found" });
    }
    res.json(session);
}

export function updateSession(req: Request, res: Response) {
  const id = Number(req.params.id);
  const session = sessions.find((session) => session.id === id);
  if (!session) {
    return res.status(404).json({ message: "Session not found" });
  }
  session.name = req.body.name.trim();
  res.json(session);
}

export function createSession(req: Request, res: Response) {
    const { name } = req.body;
    const newSession: Session = {
        id: nextSessionId++,
        name: name,
        status: "ACTIVE"
    };
    sessions.push(newSession);
    res.status(201).json(newSession);
}

export function deleteSession(req: Request, res: Response) {
  const id = Number(req.params.id);
  const sessionIndex = sessions.findIndex((session) => session.id === id);
  if (sessionIndex === -1) {
    return res.status(404).json({ message: "Session not found" });
  }
  sessions.splice(sessionIndex, 1);
  res.status(204).send();
}