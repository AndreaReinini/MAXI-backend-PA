import { Request, Response, NextFunction } from "express";

// Middleware PERSONALIZZATO - per validare la creazione di una sessione
export const validateSessionCreation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name } = req.body;
  if(typeof name !== "string" || name.trim().length === 0) {
    return res.status(400).json({ message: "Name must be a non-empty string" });
  }
  next();
};

//Middleware PERSONALIZZATO - per validare l'update di una sessione
export const validateSessionUpdate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name } = req.body;

  if (name === undefined) {
    return res.status(400).json({ message: "Name is required for update" });
  }

  if (typeof name !== "string" || name.trim().length === 0) {
    return res.status(400).json({ message: "Name must be a non-empty string" });
  }
  next();
};