import express from "express";

// Definiamo l'interfaccia per la sessione
interface Session {
  id: number;
  name: string;
  status: string;
}

//Memoria temporanea per le sessioni. NON PERSISTENTE.
const sessions: Session[] = [];

const app = express();

const PORT = 3000;

// Middleware JSON per il parsing del corpo delle richieste
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

app.post("/session", (req, res) => {
  const { name } = req.body;
  const newSession: Session = {
    id: sessions.length + 1,
    name: name,
    status: "ACTIVE"
  };
  sessions.push(newSession);
  res.status(201).json(newSession);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});