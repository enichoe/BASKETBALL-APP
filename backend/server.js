require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.use((req, res, next) => {
  console.log(`[REQUEST] ${req.method} ${req.path}`);
  next();
});
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// MongoDB Connection
let MONGO_URI = (process.env.MONGODB_URI || "").trim();

// Si la URI no empieza con el esquema correcto, usamos el fallback
if (!MONGO_URI.startsWith("mongodb://") && !MONGO_URI.startsWith("mongodb+srv://")) {
  console.log("MONGODB_URI no válida o ausente, usando base de datos por defecto.");
  MONGO_URI = "mongodb+srv://programadorwebernesto_db_user:EQsLL21GY6cebQB0@cluster0.v7wrefs.mongodb.net/basket_league_app?appName=Cluster0";
}

mongoose.connect(MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => {
    console.error("MongoDB connection error:", err);
    // No imprimimos la URI completa por seguridad si tiene éxito, pero sí en error para depurar si el usuario la ve en logs privados
    console.log("URI intentada (ofuscada):", MONGO_URI.substring(0, 20) + "...");
  });

const groupRoutes = require("./routes/groupRoutes");
const teamRoutes = require("./routes/teamRoutes");
const playerRoutes = require("./routes/playerRoutes");
const matchRoutes = require("./routes/matchRoutes");
const sponsorRoutes = require("./routes/sponsorRoutes");

// Basic route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Routes
app.use("/api/groups", groupRoutes);
app.use("/api/teams", teamRoutes);
app.use("/api/players", playerRoutes);

app.use("/api/matches", matchRoutes);
app.use("/api/sponsors", sponsorRoutes);
app.use("/api/users", require("./routes/userRoutes")); // Ruta de usuarios necesaria para login

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
