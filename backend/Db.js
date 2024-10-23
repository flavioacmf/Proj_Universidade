// db.js
const { Sequelize } = require('sequelize');

// Instanciar o Sequelize com o driver MySQL
const sequelize = new Sequelize('BDFAC', 'root', '', {
  host: 'localhost',
  dialect: 'mysql', // Especifica que você está usando o MySQL
});

// Testar a conexão
sequelize.authenticate()
  .then(() => {
    console.log('Conexão com o banco de dados foi bem sucedida!');
  })
  .catch(err => {
    console.error('Erro ao conectar ao banco de dados:', err);
  });

module.exports = sequelize; // Exporta a instância do Sequelize
