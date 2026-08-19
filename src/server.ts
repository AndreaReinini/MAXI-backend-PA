import express, { Request, Response, NextFunction } from "express";

// Definiamo l'interfaccia per la sessione
interface Session {
  id: number;
  name: string;
  status: string;
}

//Memoria temporanea per le sessioni. NON PERSISTENTE.
const sessions: Session[] = [];
let nextSessionId = 1;

const app = express();

const PORT = 3000;

// Middleware PERSONALIZZATO - per validare la creazione di una sessione
const validateSessionCreation = (
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
const validateSessionUpdate = (
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

// Middleware EXPRESS - JSON per il parsing del corpo delle richieste
app.use(express.json());

app.get("/hello", (req, res) => {
  res.json({
    message: "Hello from MAXI backend!"
  });
});

app.get("/session", (req, res) => {
  res.json(sessions);
});

//Get con route param per ottenere una sessione specifica in base all'id
app.get("/session/:id", (req, res) => {
  const id = Number(req.params.id);
  const session = sessions.find((session) => session.id === id);
  if (!session) {
    return res.status(404).json({ message: "Session not found" });
  }
  res.json(session);
});

//Patch con route param per aggiornare una sessione specifica in base all'id
app.patch("/session/:id", validateSessionUpdate, (req, res) => {
  const id = Number(req.params.id);
  const session = sessions.find((session) => session.id === id);
  if (!session) {
    return res.status(404).json({ message: "Session not found" });
  }
  session.name = req.body.name.trim();
  res.json(session);
});

//Delete con route param per eliminare una sessione specifica in base all'id
app.delete("/session/:id", (req, res) => {
  const id = Number(req.params.id);
  const sessionIndex = sessions.findIndex((session) => session.id === id);
  if (sessionIndex === -1) {
    return res.status(404).json({ message: "Session not found" });
  }
  sessions.splice(sessionIndex, 1);
  res.status(204).send();
});

app.post("/session", validateSessionCreation, (req, res) => {
  const { name } = req.body;
  const newSession: Session = {
    id: nextSessionId++,
    name: name,
    status: "ACTIVE"
  };
  sessions.push(newSession);
  res.status(201).json(newSession);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});