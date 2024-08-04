const { Sequelize, DataTypes } = require('sequelize');
const config = require('../config/config.json');
const env = process.env.NODE_ENV || 'development';
const configEnv = config[env];

const sequelize = new Sequelize(configEnv.database, configEnv.username, configEnv.password, {
    host: configEnv.host,
    dialect: configEnv.dialect,
   
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Define models and associations
db.User = require('./user')(sequelize, DataTypes);
db.FavMovie = require('./favMovie')(sequelize, DataTypes);
db.Comment = require('./comment')(sequelize, DataTypes);
// db.Movie = require(`./movies`)(sequelize, DataTypes);

// Associations
// User has many FavMovies
//  ALTER TABLE FavMovies ADD CONSTRAINT fk_user_id FOREIGN KEY (userId) REFERENCES Users (id);
//  ALTER TABLE FavMovies ADD CONSTRAINT fk_user_id FOREIGN KEY (userId) REFERENCES Users (id);
db.User.hasMany(db.FavMovie, { foreignKey: 'userId' });
db.FavMovie.belongsTo(db.User, { foreignKey: 'userId' });

// User has many Comments
//  ALTER TABLE Comments ADD CONSTRAINT fk_user_id FOREIGN KEY (userId) REFERENCES Users (id);
//  ALTER TABLE Comments ADD CONSTRAINT fk_user_id FOREIGN KEY (userId) REFERENCES Users (id);
db.User.hasMany(db.Comment, { foreignKey: 'userId' });
db.Comment.belongsTo(db.User, { foreignKey: 'userId' });


module.exports = db;
