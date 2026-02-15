const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
const User = require("./models/User");

dotenv.config();

const run = async () => {
    try {
        console.log("1. Conectando a MongoDB...");
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("   Conectado.");

        console.log("2. Buscando usuarios existentes...");
        const users = await User.find({});
        console.log(`   Se encontraron ${users.length} usuarios.`);
        users.forEach(u => console.log(`   - User: ${u.username}, Admin: ${u.isAdmin}, PwdHash: ${u.password.substring(0, 10)}...`));

        console.log("3. Intentando crear/resetear usuario 'admin'...");
        // Borrar si existe para asegurar estado limpio
        await User.deleteOne({ username: "admin" });
        
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash("adminpassword", salt);
        
        // Crear directemente (saltando hooks por si acaso, para aislar problemas)
        // Aunque lo ideal es usar el hook. Vamos a probar el hook normal primero.
        
        const newUser = new User({
            username: "admin",
            password: "adminpassword", // El hook hará el hash
            isAdmin: true
        });
        
        await newUser.save();
        console.log("   Usuario 'admin' guardado.");

        console.log("4. Verificando login...");
        const savedUser = await User.findOne({ username: "admin" });
        if (!savedUser) {
            console.error("   FATAL: El usuario no se guardó.");
            process.exit(1);
        }

        const isMatch = await bcrypt.compare("adminpassword", savedUser.password);
        console.log(`   Comparación de contraseña 'adminpassword': ${isMatch ? "SUCCESS" : "FAILED"}`);
        
        if (isMatch) {
            console.log("\n>>> DIAGNÓSTICO FINAL: EL USUARIO ESTÁ CORRECTO. EL PROBLEMA PODRÍA ESTAR EN EL CONTROLADOR O EN LA PETICIÓN DEL FRONTEND. <<<");
        } else {
            console.log("\n>>> DIAGNÓSTICO FINAL: LA CONTRASEÑA NO COINCIDE. REVISAR HOOKS DE MONGOOSE. <<<");
        }

        process.exit(0);

    } catch (e) {
        console.error("ERROR EN SCRIPT:", e);
        process.exit(1);
    }
};

run();
