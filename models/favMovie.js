module.exports = (sequelize, DataTypes) => {
    const FavMovie = sequelize.define('FavMovie', {
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Users', 
                key: 'id',
            },
            // This column is mapped to `userId` and references the `Users` table
            // SQL Column Definition: `userId` INTEGER NOT NULL,
            // SQL Foreign Key Constraint: FOREIGN KEY (`userId`) REFERENCES `Users` (`id`)
        },
        movieId: {
            type: DataTypes.STRING,
            allowNull: false,
            // This column would be mapped to `movieId` in SQL
            // SQL Column Definition: `movieId` VARCHAR NOT NULL
        },
    }, {
        tableName: 'FavMovies', // Table name in the database
        //  This specifies the table name used in SQL queries
        //  CREATE TABLE `FavMovies` (
        //   `userId` INTEGER NOT NULL,
        //   `movieId` VARCHAR NOT NULL,
        //   FOREIGN KEY (`userId`) REFERENCES `Users` (`id`)
        // );
    });

    return FavMovie;
};
