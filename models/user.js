module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            //  This column is mapped to `name` in SQL
            // SQL Column Definition: `name` VARCHAR NOT NULL
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            // This column is mapped to `email` in SQL
            // SQL Column Definition: `email` VARCHAR NOT NULL
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            // This column is mapped to `password` in SQL
            // SQL Column Definition: `password` VARCHAR NOT NULL
        },
    },{
        tableName: 'Users', 
        // This specifies the table name used in SQL queries
        //  CREATE TABLE `Users` (
        //   `name` VARCHAR NOT NULL,
        //   `email` VARCHAR NOT NULL,
        //   `password` VARCHAR NOT NULL
        // );
    });

    return User;
};
