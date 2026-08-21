import type { ErrorRequestHandler } from "express";
import { AppError } from "../errors/AppError.js";

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    console.error(err);

    if (err instanceof AppError) {
        res.status(err.statusCode).json({
            message: err.message,
        });
        return;
    }

    if (err instanceof SyntaxError && "status" in err && err.status === 400) {
        res.status(400).json({
            message: "Malformed JSON in request body",
        });
        return;
    }

    res.status(500).json({
        message: "Internal Server Error",
    });
}

export default errorHandler;