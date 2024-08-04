module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define('Comment', {
        commentText: {
            type: DataTypes.TEXT,
            allowNull: false,
            //  This column would be mapped to `commentText` in SQL
            // SQL Column Definition: `commentText` TEXT NOT NULL
        },
        rating: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: 1,
                max: 5,
            },
            //  This column would be mapped to `rating` in SQL
            // SQL Column Definition: `rating` INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5)
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Users', // Foreign key reference to the Users table
                key: 'id',      // Column in the Users table
            },
            //  This column is mapped to `userId` and references the `Users` table
            // SQL Column Definition: `userId` INTEGER NOT NULL,
            // SQL Foreign Key Constraint: FOREIGN KEY (`userId`) REFERENCES `Users` (`id`)
        },
        movieId: {
            type: DataTypes.STRING,
            allowNull: false,
            //  This column would be mapped to `movieId` in SQL
            // SQL Column Definition: `movieId` VARCHAR NOT NULL
        },
    }, {
        tableName: 'Comments', // Table name in the database
        //  This specifies the table name used in SQL queries
        //  CREATE TABLE `Comments` (
        //   `commentText` TEXT NOT NULL,
        //   `rating` INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
        //   `userId` INTEGER NOT NULL,
        //   `movieId` VARCHAR NOT NULL,
        //   FOREIGN KEY (`userId`) REFERENCES `Users` (`id`)
        // );
    });

    return Comment;
};
