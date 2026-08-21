import type { RequestHandler } from "express";
import { AppError } from "../errors/AppError.js";

const notFound: RequestHandler = (req, res, next) => {
    next(new AppError(404, `Route ${req.originalUrl} not found`));
};

export default notFound;