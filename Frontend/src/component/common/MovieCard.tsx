import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Grid from '@mui/material/Grid';
import { styled, Theme } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { RootState } from '../../redux/store';
import { addFavMOvie, removeFavMovie } from '../../services/operations/Moviesapi';
import { setFavMovie } from '../../redux/slices/movieSlice';
// import { addFavMov, removeFavMov } from '../redux/slices/userSlice';

const StyledCard = styled(Card)(({ }: { theme: Theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    height: '100%', // Adjusted to make card fill its container
}));

const StyledCardMedia = styled(CardMedia)({
    width: 200,
    height: 300,
    objectFit: 'cover',
});

interface MovieProps {
    Title: string,
    Poster: string;
    Ratings: string;
    Plot: string;
    Year: string;
    _id: string;
}

const MovieCard: React.FC<MovieProps> = ({ Title, Poster, Ratings, Plot, Year, _id }) => {
    const [isFavorite, setIsFavorite] = useState(false);
    const dispatch = useDispatch();
    const currentUser = useSelector((state: RootState) => state.auth.currentUser);
    const favMovie = useSelector((state: RootState) => state.movies.favMovie)

    console.log(favMovie, "movie card")

    const token: string = useSelector((state: RootState) => state.auth.token) as string;
    const navigate = useNavigate();

    // useEffect to initialize isFavorite based on currentUser's fav array
    console.log(`id -> ${_id}`)
    useEffect(() => {
        console.log(`useeffect run`)
        if (favMovie && favMovie.some(movie => movie.movieId === _id)) {
            console.log(`value check favmovei id `)
            setIsFavorite(true);
        } else {
            setIsFavorite(false);
        }
    }, [favMovie, _id]);

    const toggleFavorite = async () => {
        if (!currentUser) {
            navigate('/login');
            return;
        }

        // Dispatch appropriate action here if needed
        if (!isFavorite) {
            await addFavMOvie(token, _id)
        } else {
            const res = await removeFavMovie(token, _id);
            dispatch(setFavMovie(res));
        }

        setIsFavorite(prev => !prev);
    };

    const handleshowMovieDetailCard = () => {
        navigate(`/movie-details/${encodeURIComponent(`${_id}`)}`);
    };

    return (
        <StyledCard>
            <StyledCardMedia
                image={Poster}
                title={Title}
            />
            <CardContent>
                <Typography
                    variant="h6"
                    component="h2"
                    gutterBottom
                    onClick={handleshowMovieDetailCard}
                    style={{ cursor: 'pointer' }}
                >
                    {Title}
                </Typography>

                <Typography variant="body2" color="textSecondary" component="p">
                    {Plot?.length > 150 ? `${Plot.substring(0, 150)}...` : Plot}
                </Typography>
                <Grid container justifyContent="space-between" alignItems="center">
                    <Grid item>
                        <Typography variant="body2" color="textSecondary">
                            Year: {Year}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="body2" color="textSecondary">
                            Rating: {Ratings}
                        </Typography>
                    </Grid>
                </Grid>
                <IconButton onClick={toggleFavorite} aria-label="add to favorites">
                    <FavoriteIcon color={isFavorite ? 'primary' : 'action'} />
                </IconButton>
            </CardContent>
        </StyledCard>
    );
};

export default MovieCard;
