import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/AppError.js";

// Middleware PERSONALIZZATO - per validare la creazione di una sessione
export const validateSessionCreation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name } = req.body ?? {};
  if(typeof name !== "string" || name.trim().length === 0) {
    next(new AppError(400, "Name is required and must be a non-empty string"));
    return;
  }
  next();
};

//Middleware PERSONALIZZATO - per validare l'update di una sessione
export const validateSessionUpdate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name } = req.body ?? {};

  if (name === undefined) {
    next(new AppError(400, "Name is required for update"));
    return;
  }

  if (typeof name !== "string" || name.trim().length === 0) {
    next(new AppError(400, "Name must be a non-empty string"));
    return;
  }
  next();
};