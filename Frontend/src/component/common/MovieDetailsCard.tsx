import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Grid, TextField, Button, Rating } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, SubmitHandler } from 'react-hook-form';
import { RootState } from '../../redux/store';
import { Movie } from '../../utils/interface/types';
import { addCommnet, getComment } from '../../services/operations/Moviesapi';
import Loader from './Loader';
import { setLoading } from '../../redux/slices/movieSlice';
import axios from 'axios';

interface CommentFormInput {
    commentText: string;
    rating: string;
}

interface Comment {
    commentText: string;
    createdAt: string;
    id: number;
    movieId: string;
    rating: number;
    updatedAt: string;
    userId: number;
    User: {
        name: string
    }

}

const MovieDetailCard: React.FC = () => {
    const { currentUser } = useSelector((state: RootState) => state.auth);
    const token: string = useSelector((state: RootState) => state.auth.token) as string;
    const loading = useSelector((state:RootState)=>state.movies.loading);
    const dispatch = useDispatch();

    const [movies, setMovies] = useState<Movie[]>([]);
    const [commentText, setText] = useState<string>('');
    const [userRating, setUserRating] = useState<number | null>(null);
    const [error, setError] = useState<string | null>(null);
    const { _id } = useParams<{ _id: string }>();
    const [commentArray, setCommentArray] = useState<Comment[]>([]);

    const { register, handleSubmit, reset, setValue } = useForm<CommentFormInput>();

    const fetchComments = async () => {
        try {
            dispatch(setLoading(true));
            const commentRes = await getComment(_id!);
            setCommentArray(commentRes);
        } catch (error) {
            console.error('Error fetching comments:', error);
        } finally {
            dispatch(setLoading(false));
        }
    };

    const handleCommentSubmit: SubmitHandler<CommentFormInput> = async (formData) => {
        dispatch(setLoading(true));
        reset();
        const { commentText, rating } = formData;
        if (!commentText || !rating) {
            setError('Both comment and rating are required.');
            dispatch(setLoading(false));
            return;
        }
        try {
            await addCommnet(token, _id!, commentText, rating);
            setText('');
            setUserRating(null);
            setError(null); // Clear the error message
            await fetchComments(); // Fetch the latest comments after adding a new comment
        } catch (error) {
            console.error('Error adding comment:', error);
        } finally {
            dispatch(setLoading(false));
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                dispatch(setLoading(true));
                const response = await axios.get<{ allMovie: Movie[] }>("https://movieforyou-0aop.onrender.com/api/v1/movie/allMovies");
                setMovies(response.data.allMovie);
                await fetchComments(); // Fetch comments initially
            } catch (error) {
                console.error('Error fetching movie details:', error);
            } finally {
                dispatch(setLoading(false));
            }
        };

        fetchData();
    }, [dispatch, _id]);

    const movie = movies.find((item) => item._id === _id);

    const handleCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setText(event.target.value);
    };

    const handleRatingChange = (event: React.ChangeEvent<{}>, newValue: number | null) => {
        setUserRating(newValue);
        setValue('rating', newValue?.toString() || '');
    };

    return (
        <>
            {loading ? (
                <Loader />
            ) : (
                <Card>
                    <CardContent>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={4}>
                                <img src={movie?.Poster} alt={movie?.Title} style={{ maxWidth: '100%' }} />
                            </Grid>
                            <Grid item xs={12} md={8}>
                                <Typography variant="h5" gutterBottom>
                                    {movie?.Title} ({movie?.Year})
                                </Typography>
                                <Typography variant="body1" component="div" gutterBottom>
                                    <strong>Rated:</strong> {movie?.Rated}
                                </Typography>
                                <Typography variant="body1" component="div" gutterBottom>
                                    <strong>Released:</strong> {movie?.Released}
                                </Typography>
                                <Typography variant="body1" component="div" gutterBottom>
                                    <strong>Runtime:</strong> {movie?.Runtime}
                                </Typography>
                                <Typography variant="body1" component="div" gutterBottom>
                                    <strong>Genre:</strong> {movie?.Genre}
                                </Typography>
                                <Typography variant="body1" component="div" gutterBottom>
                                    <strong>Director:</strong> {movie?.Director}
                                </Typography>
                                <Typography variant="body1" component="div" gutterBottom>
                                    <strong>Writer:</strong> {movie?.Writer}
                                </Typography>
                                <Typography variant="body1" component="div" gutterBottom>
                                    <strong>Actors:</strong> {movie?.Actors}
                                </Typography>
                                <Typography variant="body1" component="div" gutterBottom>
                                    <strong>Plot:</strong> {movie?.Plot}
                                </Typography>
                                <Typography variant="body1" component="div" gutterBottom>
                                    <strong>Language:</strong> {movie?.Language}
                                </Typography>
                                <Typography variant="body1" component="div" gutterBottom>
                                    <strong>Country:</strong> {movie?.Country}
                                </Typography>
                                <Typography variant="body1" component="div" gutterBottom>
                                    <strong>Awards:</strong> {movie?.Awards}
                                </Typography>

                                <Typography variant="h6" gutterBottom style={{ marginTop: '1rem' }}>
                                    Comments:
                                </Typography>
                                <Typography variant="body1" component="div" gutterBottom>
                                    <strong>Your Rating:</strong> {userRating !== null ? userRating : 'Not rated yet by Default 1'}
                                </Typography>

                                {currentUser && (
                                    <form onSubmit={handleSubmit(handleCommentSubmit)} style={{ marginTop: '1rem' }}>
                                        <TextField
                                            {...register('commentText', { required: true })}
                                            label="Add a comment"
                                            variant="outlined"
                                            fullWidth
                                            value={commentText}
                                            onChange={handleCommentChange}
                                        />
                                        <Rating
                                            value={userRating || 0}
                                            onChange={handleRatingChange}
                                        />
                                        {error && (
                                            <Typography variant="body2" color="error" style={{ marginTop: '1rem' }}>
                                                {error}
                                            </Typography>
                                        )}
                                        <Button
                                            type="submit"
                                            variant="contained"
                                            color="primary"
                                            style={{ marginTop: '1rem' }}
                                        >
                                            Submit Comment
                                        </Button>
                                    </form>
                                )}

                                <h2 style={{ margin: '2rem' }}>Comment & Rating by</h2>
                                {commentArray && commentArray.map((comment, index) => (
                                    <div key={index}>
                                        <Typography variant="body1" style={{ margin: '2rem', whiteSpace: 'pre-line' }} gutterBottom>
                                           {`${index+1 }-->`} <strong>{comment.User.name}:</strong>
                                            {'\n'}
                                            Comment: {`${comment.commentText}`}
                                            {'\n'}
                                            Rating: {comment.rating}
                                        </Typography>
                                    </div>
                                ))}
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            )}
        </>
    );
};

export default MovieDetailCard;
