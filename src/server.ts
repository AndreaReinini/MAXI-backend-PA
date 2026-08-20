import express from "express";
import sessionRoutes from "./routes/sessionRoutes.js";

const app = express();
const PORT = 3000;

// Middleware EXPRESS - JSON per il parsing del corpo delle richieste
app.use(express.json());

// Rotta di test per verificare che il server sia attivo
app.get("/hello", (req, res) => {
  res.json({
    message: "Hello from MAXI backend!"
  });
});

// Tutte le rotte relative alle sessioni saranno gestite da sessionRoutes
app.use("/session", sessionRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});