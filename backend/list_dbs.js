const mongoose = require('mongoose');

const MONGO_URI = 'mongodb+srv://programadorwebernesto_db_user:EQsLL21GY6cebQB0@cluster0.v7wrefs.mongodb.net/?retryWrites=true&w=majority';

async function listDbs() {
  try {
    console.log('Conectando a Cluster0...');
    await mongoose.connect(MONGO_URI);
    console.log('✓ Conectado');
    
    const admin = mongoose.connection.db.admin();
    const dbs = await admin.listDatabases();
    
    console.log('\nBASES DE DATOS ENCONTRADAS:');
    dbs.databases.forEach(db => {
      console.log(`- ${db.name} (${(db.sizeOnDisk / 1024 / 1024).toFixed(2)} MB)`);
    });

    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

listDbs();
