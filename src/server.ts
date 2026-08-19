import express from "express";

const app = express();

const PORT = 3000;

// Middleware to parse JSON request bodies
app.use(express.json());

app.get("/hello", (req, res) => {
  res.json({
    message: "Hello from MAXI backend!"
  });
});

app.post("/session", (req, res) => {
  const { name } = req.body;
  res.status(201).json({
    id: 1,
    name: name,
    status: "ACTIVE"
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});