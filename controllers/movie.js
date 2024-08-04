const { FavMovie, Comment, Movie } = require('../models');
const { User } = require('../models'); // Make sure you have a User model
const { sendSuccessResponse, sendErrorResponse } = require('../utils/sendResponseFunction');

exports.setFavMovies = async (req, res) => {
    try {
        const { movieId } = req.params;
        const userdecode = req.user;
        const userId = userdecode.id;
        console.log(User, "schem");
        console.log(`movieID->${movieId}   userid->${userId}`);
        if (!userId || !movieId) {
            sendErrorResponse(res,400,"UserId and movieId both are required");
            
        }

        // Check if the user exists
        //  SELECT * FROM Users WHERE id = userId;
        const user = await User.findByPk(userId);
        if (!user) {
            return sendErrorResponse(res,404,"User not found")
        }

        // Check if the FavMovie record exists
        //  SELECT * FROM FavMovies WHERE userId = userId AND movieId = movieId;
        const existingFavMovie = await FavMovie.findOne({
            where: { userId, movieId },
        });

        if (existingFavMovie) {
            return sendErrorResponse(res,400,"Movie already favorited")

        }

        // Add the new FavMovie record
        //  INSERT INTO FavMovies (userId, movieId) VALUES (userId, movieId);
        const newFavMovie = await FavMovie.create({ userId, movieId });
        return res.status(201).json({ message: 'Movie added to favorites', data: newFavMovie });

    } catch (error) {
        console.error('Error in setFavMovies:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.getFavMoviesByUser = async (req, res) => {
    try {
        const users = req.user;
        const userId = users.id;
        // Find the user
        // SELECT * FROM Users WHERE id = userId;
        const user = await User.findByPk(userId);

        if (!user) {
            return sendErrorResponse(res,400,"User not found");
        }

        // Fetch all favorite movies for the user
        //  SELECT * FROM FavMovies WHERE userId = userId;
        const favMovies = await FavMovie.findAll({
            where: { userId }
        });

        return res.status(200).json({
            success: true,
            message: "fav movie fetch successfully",
            favMovies
        });

    

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred' });
    }
};

exports.addComment = async (req, res) => {
    try {
        const { movieId } = req.params;
        const userdecode = req.user;
        const { commentText, rating } = req.body;
        const userId = userdecode.id;

        if (!movieId || !userId) {
            return sendErrorResponse(res,400,'userId and movieId are required')
            
        }
        // Check if the user exists
        //  SELECT * FROM Users WHERE id = userId;
        const user = await User.findByPk(userId);
        if (!user) {
            return sendErrorResponse(res,404,"User not found");
            
        }

        // Add the new Comment record
        //INSERT INTO Comments (commentText, rating, userId, movieId) VALUES (commentText, rating, userId, movieId);
        const newCommnet = await Comment.create({ commentText, rating, userId, movieId });
        return sendSuccessResponse(res,201,"Commnet Successfullly");
       
    } catch (error) {
        console.error('Error in addComment:', error);
        return sendErrorResponse(res,500,'Internal Server Error')
    }
}

exports.getComments = async (req, res) => {
    try {
        const { movieId } = req.params;
        if (!movieId) {
          return  sendErrorResponse(res,400,"Movied id is requied")
            
        }

        // Fetch comments for a movie
        //  SELECT * FROM Comments WHERE movieId = movieId;
        // Plus join with Users table:
        // SELECT Comments.*, Users.name FROM Comments
        // JOIN Users ON Comments.userId = Users.id
        // WHERE Comments.movieId = movieId;
        const Comments = await Comment.findAll({
            where: { movieId },
            include: [{
                model: User,
                attributes: ['name'], // Include only the name field from the User model
            }]
        });
        // console.log(Comments)
        return sendSuccessResponse(res,200,"Fetched comments successfully",Comments);
      
    } catch (error) {
        console.error(error);
        return sendErrorResponse(res,500,"An error occurred while extracting movie comments");
        
    }
};

exports.removeFavMovie = async (req, res) => {
    try {
        const { movieId } = req.params;
        const userdecode = req.user;
        const userId = userdecode.id;

        // Delete the entry from FavMovie where both userId and movieId match
        //DELETE FROM FavMovies WHERE userId = userId AND movieId = movieId;
        console.log(`here to delete`);
        const result = await FavMovie.destroy({
            where: { userId, movieId }
        });

        // Fetch the remaining entries in FavMovie
        // SELECT * FROM FavMovies WHERE userId = userId;
        console.log(`here to find`);
        const remainingEntries = await FavMovie.findAll({
            where: { userId }
        });

        // Check if any rows were deleted
        if (result === 0) {
            return sendErrorResponse(res,400,"No matching entry found to delete")
        }
         return sendSuccessResponse(res,200,'Entry successfully deleted',remainingEntries);
       
    } catch (error) {
        console.error('Error removing favorite movie:', error);
        return sendErrorResponse(res,500,'Internal Server Error')
        
    }
};
