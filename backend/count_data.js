const mongoose = require('mongoose');

const MONGO_URI = 'mongodb+srv://programadorwebernesto_db_user:EQsLL21GY6cebQB0@cluster0.v7wrefs.mongodb.net/basket_league_app?retryWrites=true&w=majority';

async function countData() {
  try {
    console.log('Conectando a Cluster0 (basket_league_app)...');
    await mongoose.connect(MONGO_URI);
    console.log('✓ Conectado');
    
    const collections = ['groups', 'teams', 'players', 'matches', 'sponsors', 'users'];
    
    console.log('\nCONTEO DE DOCUMENTOS:');
    for (const collName of collections) {
      const count = await mongoose.connection.db.collection(collName).countDocuments();
      console.log(`- ${collName}: ${count}`);
    }

    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

countData();
