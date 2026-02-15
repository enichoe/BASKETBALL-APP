const mongoose = require('mongoose');

// Import Models
const Group = require('./models/Group');
const Team = require('./models/Team');
const Player = require('./models/Player');
const Match = require('./models/Match');
const Sponsor = require('./models/Sponsor');

// Connection directo
const MONGO_URI = 'mongodb+srv://enichoe_db_user:alianzalima@ligaapppro.hmybvyc.mongodb.net/ligapro?retryWrites=true&w=majority';

const seedData = async () => {
    try {
        console.log('\n🔄 Conectando a MongoDB Atlas...');
        await mongoose.connect(MONGO_URI);
        console.log('✅ Conectado a la base de datos');
        console.log('📍 Database:', mongoose.connection.name);

        console.log('\n🗑️  Limpiando datos anteriores...');
        await Group.deleteMany({});
        await Team.deleteMany({});
        await Player.deleteMany({});
        await Match.deleteMany({});
        await Sponsor.deleteMany({});
        console.log('✅ Base de datos limpiada');

        console.log('\n📝 Creando datos de ejemplo...\n');

        // 1. Grupos
        console.log('  Creando grupos...');
        const groupA = await Group.create({ nombre: 'Grupo A' });
        const groupB = await Group.create({ nombre: 'Grupo B' });
        console.log('  ✅ 2 grupos creados');

        // 2. Equipos
        console.log('  Creando equipos...');
        const team1 = await Team.create({ 
            nombre: 'Los Tigres', 
            grupo: groupA._id, 
            logo: 'https://via.placeholder.com/150', 
            color: '#FF5733' 
        });
        const team2 = await Team.create({ 
            nombre: 'Águilas Reales', 
            grupo: groupA._id, 
            logo: 'https://via.placeholder.com/150', 
            color: '#33FF57' 
        });
        const team3 = await Team.create({ 
            nombre: 'Deportivo Rayo', 
            grupo: groupB._id, 
            logo: 'https://via.placeholder.com/150', 
            color: '#3357FF' 
        });
        const team4 = await Team.create({ 
            nombre: 'Huracanes FC', 
            grupo: groupB._id, 
            logo: 'https://via.placeholder.com/150', 
            color: '#FFFF33' 
        });
        console.log('  ✅ 4 equipos creados');

        // 3. Jugadores
        console.log('  Creando jugadores...');
        await Player.create({ nombre: 'Juan Pérez', equipo: team1._id, edad: 25, posicion: 'Delantero', goles: 5 });
        await Player.create({ nombre: 'Carlos López', equipo: team1._id, edad: 28, posicion: 'Portero', goles: 0 });
        await Player.create({ nombre: 'Pedro Silva', equipo: team2._id, edad: 22, posicion: 'Medio', goles: 3 });
        await Player.create({ nombre: 'Luis García', equipo: team3._id, edad: 26, posicion: 'Delantero', goles: 7 });
        await Player.create({ nombre: 'Miguel Torres', equipo: team4._id, edad: 24, posicion: 'Defensa', goles: 1 });
        console.log('  ✅ 5 jugadores creados');

        // 4. Partidos
        console.log('  Creando partidos...');
        await Match.create({ 
            equipoA: team1._id, 
            equipoB: team2._id, 
            fecha: '2024-01-15', 
            horario: '18:00',
            ubicacion: 'Estadio Central',
            fase: 'grupos',
            estado: 'finalizado', 
            golesA: 2, 
            golesB: 1
        });
        
        await Match.create({ 
            equipoA: team3._id, 
            equipoB: team4._id, 
            fecha: '2024-01-16', 
            horario: '20:00',
            ubicacion: 'Campo Municipal',
            fase: 'grupos',
            estado: 'proximo'
        });
        console.log('  ✅ 2 partidos creados');

        // 5. Sponsors
        console.log('  Creando auspiciadores...');
        await Sponsor.create({ 
            nombre: 'Refrescos Del Valle', 
            logo: 'https://via.placeholder.com/150', 
            link: 'https://example.com' 
        });
        await Sponsor.create({ 
            nombre: 'Deportes Pro', 
            logo: 'https://via.placeholder.com/150', 
            link: 'https://example.com' 
        });
        console.log('  ✅ 2 auspiciadores creados');

        console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log('  ✅ DATOS CARGADOS EXITOSAMENTE');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log('\n📊 Resumen:');
        console.log('  • 2 Grupos');
        console.log('  • 4 Equipos');
        console.log('  • 5 Jugadores');
        console.log('  • 2 Partidos');
        console.log('  • 2 Auspiciadores');
        console.log('\n🌐 URL: https://liga-app-pro.vercel.app');
        console.log('🔑 Login: admin / admin123\n');

        await mongoose.connection.close();
        process.exit(0);
    } catch (error) {
        console.error('\n❌ Error:', error.message);
        console.error(error);
        process.exit(1);
    }
};

seedData();
