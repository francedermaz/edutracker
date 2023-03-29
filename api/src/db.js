require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const {
  DB_USER, DB_PASSWORD, DB_HOST, DB_NAME
} = process.env;

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`, {
  logging: false,
  native: false,
});
const basename = path.basename(__filename);

const modelDefiners = [];

fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

modelDefiners.forEach(model => model(sequelize));
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

const { Room, Sibling, Student, User } = sequelize.models;

Student.belongsTo(Room); // A student belongs to a room
Room.hasMany(Student); // A room has many students
Student.hasMany(Sibling, { as: 'siblings' }); // A student has many siblings
Sibling.belongsTo(Student, { as: 'siblingOf' }); // A sibling belongs to a student
User.hasMany(Room); // A user has many rooms
Room.belongsTo(User); // A room belongs to a user

module.exports = {
  ...sequelize.models,
  conn: sequelize,
};
