// Import necessary packages
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// Import the dotenv package
require('dotenv').config();

// Now you can access your environment variables
const DB_NAME = process.env.DB_NAME;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;

// Define the Category model
class Category extends Model {}

Category.init({
  // Define model attributes
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  category_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'category',
  timestamps: false, // Disable timestamps for simplicity
});

// Define the Product model
class Product extends Model {}

Product.init({
  // Define model attributes
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  product_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.DECIMAL,
    allowNull: false,
    validate: {
      isDecimal: true,
    },
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 10,
    validate: {
      isNumeric: true,
    },
  },
  category_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'category',
      key: 'id',
    },
  },
}, {
  sequelize,
  modelName: 'product',
  timestamps: false, // Disable timestamps for simplicity
});

// Define the Tag model
class Tag extends Model {}

Tag.init({
  // Define model attributes
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  tag_name: {
    type: DataTypes.STRING,
  },
}, {
  sequelize,
  modelName: 'tag',
  timestamps: false, // Disable timestamps for simplicity
});

// Define the ProductTag model (through model for many-to-many association)
class ProductTag extends Model {}

ProductTag.init({
  // Define model attributes
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  product_id: {
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
    },
  },
}, {
  sequelize,
  modelName: 'product_tag',
  timestamps: false, // Disable timestamps for simplicity
});

// Associations
Category.hasMany(Product, {
  foreignKey: 'category_id',
});

Product.belongsTo(Category, {
  foreignKey: 'category_id',
});

Product.belongsToMany(Tag, {
  through: ProductTag,
  foreignKey: 'product_id',
});

Tag.belongsToMany(Product, {
  through: ProductTag,
  foreignKey: 'tag_id',
});

module.exports = { Category, Product, Tag, ProductTag };
