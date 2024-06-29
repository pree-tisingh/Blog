const Sequelize = require('sequelize');
const sequelize = new Sequelize('nodejs' , 'root' ,'preeti' ,{
    dialect:'mysql',
    host:'localhost'
});

module.exports = sequelize;