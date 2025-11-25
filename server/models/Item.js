const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');

const Item = sequelize.define('Item', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0.00,
    },
    status: {
        type: DataTypes.ENUM('In Stock', 'Low Stock', 'Out of Stock'),
        defaultValue: 'In Stock',
    },
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'id',
        },
    },
});

User.hasMany(Item, { foreignKey: 'userId' });
Item.belongsTo(User, { foreignKey: 'userId' });

module.exports = Item;
