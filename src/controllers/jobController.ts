import type { Request, Response } from "express";
import Job from "../models/Job.js";
import Session from "../models/Session.js";
import { AppError } from "../errors/AppError.js";

// Funzione per ottenere tutti i lavori
export async function getJobs(req: Request, res: Response) {
    const jobs = await Job.findAll();
    res.json(jobs);
}

export async function getJobById(req: Request, res: Response) {
    const id = Number(req.params.id);
    const job = await Job.findByPk(id);
    if (!job) {
        throw new AppError(404, "Job not found");
    }
    res.json(job);
}

// Funzione per creare un nuovo lavoro
export async function createJob(req: Request, res: Response) {
    const {sessionId } = req.body;
    //Doppio controllo applicativo e database per verificare che la sessione esista prima di creare un lavoro
    const session = await Session.findByPk(sessionId);
    if (!session) {
        throw new AppError(404, "Session not found");
    }
    const newJob = await Job.create({
        sessionId
    });
    res.status(201).json(newJob);
}