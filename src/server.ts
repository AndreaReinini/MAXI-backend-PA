import sequelize from "./config/database.js";
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

// Avvio del server e connessione al database
async function startServer() {
  try {
    // Test di connessione al database
    await sequelize.authenticate();
    console.log("Database connection has been established successfully.");

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

startServer();