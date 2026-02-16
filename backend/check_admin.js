const mongoose = require("mongoose");
require("dotenv").config();
const User = require("./models/User");

const checkAdmin = async () => {
    try {
        const uri = process.env.MONGODB_URI || "mongodb+srv://enichoe_db_user:alianzalima@ligaapppro.hmybvyc.mongodb.net/basket_league_app";
        console.log("Conectando a:", uri.split("@")[1]); // No mostrar password
        await mongoose.connect(uri);
        console.log("Conectado a MongoDB");

        const admin = await User.findOne({ username: "admin" });
        if (admin) {
            console.log("¡ÉXITO! El usuario 'admin' existe en la base de datos.");
            console.log("Admin ID:", admin._id);
        } else {
            console.log("ADVERTENCIA: El usuario 'admin' NO existe.");
            console.log("Por favor, ejecuta 'node seed.js' para crearlo.");
        }

        process.exit(0);
    } catch (err) {
        console.error("Error al verificar admin:", err.message);
        process.exit(1);
    }
};

checkAdmin();
