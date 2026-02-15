const mongoose = require('mongoose');
const User = require('./models/User');

// Connection string directo
const MONGO_URI = 'mongodb+srv://enichoe_db_user:alianzalima@ligaapppro.hmybvyc.mongodb.net/ligapro?retryWrites=true&w=majority';

const createAdmin = async () => {
  try {
    console.log('\n🔄 Iniciando creación de usuario admin...\n');
    console.log('📡 Conectando a MongoDB Atlas...');
    
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    
    console.log('✅ Conectado a MongoDB Atlas exitosamente');
    console.log('📍 Base de datos:', mongoose.connection.name);
    console.log('📍 Host:', mongoose.connection.host);
    
    // Verificar si ya existe
    const existingAdmin = await User.findOne({ username: 'admin' });
    if (existingAdmin) {
      console.log('\n⚠️  Usuario admin ya existe, eliminando...');
      await User.deleteOne({ username: 'admin' });
      console.log('✅ Usuario anterior eliminado');
    }

    // Crear nuevo admin
    console.log('\n📝 Creando nuevo usuario admin...');
    const admin = new User({
      username: 'admin',
      password: 'admin123',
      isAdmin: true
    });

    await admin.save();
    console.log('✅ Usuario guardado en base de datos');
    
    // Verificar que se creó correctamente
    const verifyUser = await User.findOne({ username: 'admin' });
    console.log('\n🔍 Verificación:');
    console.log('  - Username:', verifyUser.username);
    console.log('  - Is Admin:', verifyUser.isAdmin);
    console.log('  - Password hash existe:', verifyUser.password ? '✅' : '❌');
    console.log('  - Password hash length:', verifyUser.password.length);
    
    // Probar el método matchPassword
    const isValidPassword = await verifyUser.matchPassword('admin123');
    console.log('  - Test password match:', isValidPassword ? '✅ CORRECTO' : '❌ ERROR');
    
    if (isValidPassword) {
      console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log('  ✅ USUARIO ADMIN CREADO EXITOSAMENTE');
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log('\n  🔑 CREDENCIALES:');
      console.log('     Username: admin');
      console.log('     Password: admin123');
      console.log('\n  🌐 URLS:');
      console.log('     Frontend: https://liga-app-pro.vercel.app');
      console.log('     Backend:  https://ligaapppro.onrender.com');
      console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    } else {
      console.error('\n❌ ERROR: El password no coincide. Hay un problema con bcrypt.');
    }

    await mongoose.connection.close();
    console.log('📡 Conexión cerrada\n');
    process.exit(0);
    
  } catch (error) {
    console.error('\n❌ ERROR:', error.message);
    console.error('Stack:', error.stack);
    process.exit(1);
  }
};

createAdmin();
