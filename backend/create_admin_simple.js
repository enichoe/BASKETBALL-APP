const mongoose = require('mongoose');
const User = require('./models/User');

const MONGO_URI = 'mongodb+srv://enichoe_db_user:alianzalima@ligaapppro.hmybvyc.mongodb.net/ligapro?retryWrites=true&w=majority';

async function createAdmin() {
  try {
    console.log('Conectando a MongoDB Atlas...');
    await mongoose.connect(MONGO_URI);
    console.log('✓ Conectado');
    console.log('Base de datos:', mongoose.connection.name);
    
    // Eliminar admin anterior
    await User.deleteOne({ username: 'admin' });
    console.log('✓ Admin anterior eliminado');

    // Crear nuevo admin
    const admin = new User({
      username: 'admin',
      password: 'admin123',
      isAdmin: true
    });

    await admin.save();
    console.log('✓ Usuario admin creado');
    
    // Verificar
    const verify = await User.findOne({ username: 'admin' });
    const isValid = await verify.matchPassword('admin123');
    
    console.log('\nVerificación:');
    console.log('Username:', verify.username);
    console.log('Password match:', isValid ? '✓ CORRECTO' : '✗ ERROR');
    
    if (isValid) {
      console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log('✓ USUARIO CREADO');
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log('\nUsername: admin');
      console.log('Password: admin123');
      console.log('\nURL: https://liga-app-pro.vercel.app\n');
    }

    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

createAdmin();
