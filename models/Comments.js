const Sequelize = require('sequelize');
const sequelize = require('../utils/database');

const comment = sequelize.define('Comment',{
    id:{
        type:Sequelize.INTEGER,
        allowNull:false,
        primaryKey:true,
        autoIncrement:true
    },
    content:{
        type:Sequelize.TEXT,
        allowNull:false,
    },
    author:{
        type: Sequelize.STRING,
        defaultValue: 'massy',
    }
});

module.exports = comment;