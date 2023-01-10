// import important parts of sequelize library
const { INTEGER } = require('sequelize');
const { Model, DataTypes } = require('sequelize');
// import our database connection from config.js
const sequelize = require('../config/connection');

// Initialize Product model (table) by extending off Sequelize's Model class
class ProductTag extends Model { }

// set up fields and rules for Product model
ProductTag.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,

        },
        product_id:{
    type: DataTypes.INTEGER,
    references: {
        model: 'product',
        key: 'id',

    },
},
tag_id: {
    type: DataTypes.INTEGER,
    references: {
        model: 'tag',
        key: 'id',
    }

}

});
module.exports = ProductTag