const express=require("express");
const { auth } = require("../middlewares/auth");
const { setFavMovies, getFavMoviesByUser, addComment, getComments, removeFavMovie } = require("../controllers/movie");

const router=express.Router();





router.post('/setFavMovies/:movieId',auth,setFavMovies);
router.get('/getUserFavMovies',auth,getFavMoviesByUser)
router.post('/addComment/:movieId',auth,addComment)
router.get('/getComments/:movieId',getComments);
router.post(`/removeFavMovies/:movieId`,auth,removeFavMovie);


module.exports = router;