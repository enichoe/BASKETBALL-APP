const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env.temp') });
const mongoose = require('mongoose');
const User = require('./models/User');

const createAdmin = async () => {
  try {
    console.log('Conectando a MongoDB producción...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✓ Conectado a MongoDB');

    // Eliminar admin anterior si existe
    await User.deleteOne({ username: 'admin' });
    console.log('✓ Admin anterior eliminado (si existía)');

    // Crear nuevo admin
    const admin = new User({
      username: 'admin',
      password: 'admin123',
      isAdmin: true
    });

    await admin.save();
    console.log('✓ Usuario admin creado exitosamente');
    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('  CREDENCIALES DE ACCESO');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('  Username: admin');
    console.log('  Password: admin123');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('\n✓ ¡Proyecto listo!');
    console.log('  Frontend: https://liga-app-pro.vercel.app');
    console.log('  Backend:  https://ligaapppro.onrender.com\n');

    process.exit(0);
  } catch (error) {
    console.error('✗ Error:', error.message);
    process.exit(1);
  }
};

createAdmin();
