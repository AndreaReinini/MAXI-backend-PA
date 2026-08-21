import type { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/AppError.js";
import { JOB_STATUSES } from "../types/jobStatus.js";

// Middleware PERSONALIZZATO - per validare la creazione di un lavoro

export const validateJobCreation = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { sessionId } = req.body ?? {};

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

export const validateJobUpdate = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { status } = req.body ?? {};

    if (typeof status !== "string" || !JOB_STATUSES.includes(status as typeof JOB_STATUSES[number])) {
        next(new AppError(400, "Invalid job status. Must be one of: " + JOB_STATUSES.join(", ")));
        return;
    }

    next();
};

export const validateJobCompletion = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { result } = req.body ?? {};

    if (
        typeof result !== "object" ||
        result === null ||
        Array.isArray(result)
    ) {
        next(new AppError(400, "Result must be a JSON object"));
        return;
    }

    next();
};