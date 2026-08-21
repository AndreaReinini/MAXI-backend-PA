import type { Request, Response } from "express";
import SessionModel from "../models/Session.js";
import { AppError } from "../errors/AppError.js";

// Funzione per ottenere tutte le sessioni
export async function getSessions(req: Request, res: Response) {
  const sessions = await SessionModel.findAll();
  res.json(sessions);
}

// Funzione per ottenere una sessione specifica tramite ID
export async function getSessionById(req: Request, res: Response) {
  const id = Number(req.params.id);
  const session = await SessionModel.findByPk(id);
  if (!session) {
    throw new AppError(404, "Session not found");
  }
  res.json(session);
}

// Funzione per aggiornare una sessione specifica tramite ID
export async function updateSession(req: Request, res: Response) {
  const id = Number(req.params.id);
  const session = await SessionModel.findByPk(id);
  if (!session) {
    throw new AppError(404, "Session not found");
  }
  await session.update({ name: req.body.name.trim() });
  res.json(session);
}


// Funzione per creare una nuova sessione
export async function createSession(req: Request, res: Response) {
  const { name } = req.body;

  const newSession = await SessionModel.create({
    name
  });

  res.status(201).json(newSession);
}

// Funzione per eliminare una sessione specifica tramite ID
export async function deleteSession(req: Request, res: Response) {
  const id = Number(req.params.id);
  const session = await SessionModel.findByPk(id);
  if (!session) {
    throw new AppError(404, "Session not found");
  }
  await session.destroy();
  res.status(204).send();
}