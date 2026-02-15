const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("./models/User");
const bcrypt = require("bcryptjs");

dotenv.config();

const resetAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("MongoDB Conectado");

        // 1. Eliminar admin previo
        await User.deleteOne({ username: "admin" });
        console.log("Admin anterior eliminado (si existía)");

        // 2. Crear admin explícitamente usando save() para asegurar hooks
        const adminUser = new User({
            username: "admin",
            password: "adminpassword",
            isAdmin: true
        });

        await adminUser.save();
        console.log("Nuevo usuario 'admin' creado con password 'adminpassword'");

        // 3. Verificar inmediatamente
        const user = await User.findOne({ username: "admin" });
        console.log("Usuario recuperado de DB:", user.username);
        console.log("Hash en DB:", user.password);

        const isMatch = await user.matchPassword("adminpassword");
        console.log("¿Prueba de login interna exitosa?:", isMatch);

        if(isMatch) {
            console.log("\n>>> ÉXITO: El usuario funciona. Usa 'admin' / 'adminpassword' en el frontend. <<<");
        } else {
            console.error("\n>>> ERROR: La contraseña no coincide incluso recién creada. Revisa bcrypt/hooks. <<<");
        }

        process.exit();
    } catch (error) {
        console.error("Error:", error);
        process.exit(1);
    }
};

resetAdmin();
