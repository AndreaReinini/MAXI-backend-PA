import express from "express";
import sessionRoutes from "./routes/sessionRoutes.js";
import sequelize from "./config/database.js";
import "./models/Session.js"; // Importazione del modello Session per garantire che sia registrato con Sequelize

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
    // Verifica che PostgreSQL sia in esecuzione e che le credenziali siano corrette
    await sequelize.authenticate();
    console.log("Database connection has been established successfully.");

    //Sincronizza i modelli con il database (crea le tabelle se non esistono)
    await sequelize.sync();
    console.log("Database synchronized successfully.");

    // Avvio del server Express

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

startServer();