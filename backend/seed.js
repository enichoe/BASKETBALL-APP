const mongoose = require("mongoose");
const dotenv = require("dotenv");

// Import Models
const Group = require("./models/Group");
const Team = require("./models/Team");
const Player = require("./models/Player");
const Match = require("./models/Match");
const Sponsor = require("./models/Sponsor");
const User = require("./models/User");

dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("MongoDB connected");
    } catch (err) {
        console.error("Error connecting to MongoDB:", err);
        process.exit(1);
    }
};

const seedData = async () => {
    await connectDB();

    try {
        console.log("Limpiando base de datos...");
        await Group.deleteMany({});
        await Team.deleteMany({});
        await Player.deleteMany({});
        await Match.deleteMany({});
        await Sponsor.deleteMany({});

        console.log("Creando datos de ejemplo...");

        // 1. Grupos
        // Schema: nombre
        const groupA = await Group.create({ nombre: "Grupo A" });
        const groupB = await Group.create({ nombre: "Grupo B" });

        // 2. Equipos
        // Schema: nombre, logo, color, grupo
        const team1 = await Team.create({ 
            nombre: "Los Tigres", 
            grupo: groupA._id, 
            logo: "https://via.placeholder.com/150", 
            color: "#FF5733" 
        });
        const team2 = await Team.create({ 
            nombre: "Águilas Reales", 
            grupo: groupA._id, 
            logo: "https://via.placeholder.com/150", 
            color: "#33FF57" 
        });
        const team3 = await Team.create({ 
            nombre: "Deportivo Rayo", 
            grupo: groupB._id, 
            logo: "https://via.placeholder.com/150", 
            color: "#3357FF" 
        });
        const team4 = await Team.create({ 
            nombre: "Huracanes FC", 
            grupo: groupB._id, 
            logo: "https://via.placeholder.com/150", 
            color: "#FFFF33" 
        });

        // 3. Jugadores
        // Schema: nombre, edad, posicion, equipo
        await Player.create({ nombre: "Juan Pérez", equipo: team1._id, edad: 25, posicion: "Delantero", goles: 5 });
        await Player.create({ nombre: "Carlos López", equipo: team1._id, edad: 28, posicion: "Portero" });
        await Player.create({ nombre: "Pedro Silva", equipo: team2._id, edad: 22, posicion: "Medio" });

        // 4. Partidos
        // Schema: fecha, horario, ubicacion, equipoA, equipoB, golesA, golesB, estado
        await Match.create({ 
            equipoA: team1._id, 
            equipoB: team2._id, 
            fecha: "2023-12-01", 
            horario: "18:00",
            ubicacion: "Estadio Central",
            estado: "finalizado", 
            golesA: 2, 
            golesB: 1
        });
        
        await Match.create({ 
            equipoA: team3._id, 
            equipoB: team4._id, 
            fecha: "2024-01-15", 
            horario: "20:00",
            ubicacion: "Campo Municipal",
            estado: "proximo"
        });

        // 5. Sponsors
        // Schema: nombre, logo, link
        await Sponsor.create({ 
            nombre: "Refrescos Del Valle", 
            logo: "https://via.placeholder.com/150", 
            link: "https://example.com" 
        });

        // 6. Usuario Admin
        await User.create({
            username: "admin",
            password: "adminpassword", // El modelo User tiene pre-save hook para hashear? Verifiquemos controller.
            isAdmin: true
        });
        // Nota: Si el modelo User encripta password en pre('save'), esto funcionará. 
        // Si no, userController.js hace matchPassword(password) comparando bcrypt.compare.
        // Asumiendo que User.js tiene middleware pre-save para hash. Si no, login fallará.
        // Voy a verificar User.js después de esto.

        console.log("¡Datos cargados exitosamente!");
        process.exit();
    } catch (error) {
        console.error("Error al poblar datos:", error);
        process.exit(1);
    }
};

seedData();
