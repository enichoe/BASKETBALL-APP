require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: (origin, callback) => {
    // Permitir cualquier origen en modo desarrollo o si no se especifica FRONTEND_URL
    if (!process.env.FRONTEND_URL || process.env.FRONTEND_URL === '*') {
      callback(null, true);
    } else {
      const allowedOrigins = [process.env.FRONTEND_URL];
      if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
        callback(null, true);
      } else {
        callback(null, true); // Fallback: permitir todos para debugging
      }
    }
  },
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
  console.warn("⚠️ MONGODB_URI no válida o ausente en variables de entorno, usando fallback.");
  MONGO_URI = "mongodb+srv://programadorwebernesto_db_user:EQsLL21GY6cebQB0@cluster0.v7wrefs.mongodb.net/basket_league_app?appName=Cluster0";
}

// Routes imports
const groupRoutes = require("./routes/groupRoutes");
const teamRoutes = require("./routes/teamRoutes");
const playerRoutes = require("./routes/playerRoutes");
const matchRoutes = require("./routes/matchRoutes");
const sponsorRoutes = require("./routes/sponsorRoutes");
const userRoutes = require("./routes/userRoutes");

// Health check and diagnostics (High Priority)
app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    uptime: process.uptime(),
    dbStatus: mongoose.connection.readyState === 1 ? "connected" : "disconnected",
    dbName: mongoose.connection.name,
    timestamp: new Date().toISOString()
  });
});

app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    uptime: process.uptime(),
    dbStatus: mongoose.connection.readyState === 1 ? "connected" : "disconnected",
    dbName: mongoose.connection.name,
    timestamp: new Date().toISOString()
  });
});

app.get("/api/diag", async (req, res) => {
  try {
    const connected = mongoose.connection.readyState === 1;
    let collections = [];
    if (connected) {
      collections = await mongoose.connection.db.listCollections().toArray();
    }
    res.json({
      connected,
      dbName: mongoose.connection.name,
      collections: collections.map(c => c.name),
      uri_start: MONGO_URI.substring(0, 25) + "..."
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Routes
app.use("/api/groups", groupRoutes);
app.use("/api/teams", teamRoutes);
app.use("/api/players", playerRoutes);
app.use("/api/matches", matchRoutes);
app.use("/api/sponsors", sponsorRoutes);
app.use("/api/users", userRoutes);

// Root route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Connect to MongoDB and then start server
console.log("Intentando conectar a MongoDB...");
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected successfully");
    console.log("📍 Database name:", mongoose.connection.name);
    
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error("❌ CRITICAL: MongoDB connection failed:", err.message);
    console.error("🔍 Tip: Verifica el Whitelist de IP en MongoDB Atlas (añadir 0.0.0.0/0 para Render).");
    console.error("🔍 Tip: Verifica que la variable MONGODB_URI sea correcta en Render.");
    
    // In production, exit if DB connection fails so the orchestrator can restart the service
    setTimeout(() => {
      if (process.env.NODE_ENV === 'production') {
        process.exit(1);
      }
    }, 5000);
  });
