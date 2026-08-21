import type { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/AppError.js";

// Middleware PERSONALIZZATO - per validare la creazione di un lavoro

export const validateJobCreation = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { sessionId } = req.body;

    if (
        typeof sessionId !== "number" ||
        !Number.isInteger(sessionId) ||
        sessionId <= 0
    ) {
        next(new AppError(400, "sessionId must be a positive integer"));
        return;
    }

    next();
};