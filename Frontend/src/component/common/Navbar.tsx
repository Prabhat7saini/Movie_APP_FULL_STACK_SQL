import { useEffect, useState } from 'react';
import { AppBar, Box, Button, TextField, InputAdornment, Grid, IconButton, Drawer, List, ListItem, ListItemText, useMediaQuery, useTheme } from '@mui/material';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import MenuIcon from '@mui/icons-material/Menu';
import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';
import { logout } from '../../services/operations/Authapi';
import { UnknownAction } from 'redux';
import { setFavMovie, setIsSearch, setLoading, setMovies } from '../../redux/slices/movieSlice';
import axios from 'axios';
import { Movie } from '../../utils/interface/types';
import { fetchFavMovie } from '../../services/operations/Moviesapi';
import Loader from './Loader';

interface FormValues {
    searchTerm: string;
}

const Navbar = () => {
    const navigate = useNavigate();
    const { control, handleSubmit } = useForm<FormValues>();

    const currentUser = useSelector((state: RootState) => state.auth.currentUser);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [originalMovies, setOriginalMovies] = useState<Movie[]>([]); // Store original movies

    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

    const token: string = useSelector((state: RootState) => state.auth.token) as string;
    const loading = useSelector((state: RootState) => state.movies.loading);

    const dispatch = useDispatch();
    let changevalue=false;

    useEffect(() => {
        dispatch(setLoading(true));
        const fetchAndSetMovies = async () => {
            try {
                const response = await axios.get<{ allMovie: Movie[] }>("http://localhost:4000/api/v1/movie/allMovies");
                const movies = response.data.allMovie;
                setOriginalMovies(movies); // Store original movies
                dispatch(setMovies(movies)); // Dispatch setMovies with the correct type

                if (token) {
                    const favMoviesRes = await fetchFavMovie(token);
                    dispatch(setFavMovie(favMoviesRes?.data.favMovies || []));
                }
            } catch (error) {
                console.error("Failed to fetch movies:", error);
            } finally {
                dispatch(setLoading(false));
            }
        };

        fetchAndSetMovies();
    }, [token, dispatch, changevalue]);

    const wholedata = useSelector((state: RootState) => state.movies.movies)

    function searchMovies(query: string): Movie[] {
        if (!query) return [];
        const lowerCaseQuery = query.toLowerCase();

        const filteredMovies = wholedata.filter(movie => {
            const title = movie.Title.toLowerCase();
            const plot = movie.Plot.toLowerCase();
            return title.includes(lowerCaseQuery) || plot.includes(lowerCaseQuery);
        });

        return filteredMovies;
    }

    const onSubmit: SubmitHandler<FormValues> = async ({ searchTerm }) => {
        console.log('Form submitted with data:', searchTerm);
        if (searchTerm.length > 0) {
            dispatch(setIsSearch(true));
            const result = searchMovies(searchTerm);
            console.log(result);
            dispatch(setMovies(result));
        } else {
            dispatch(setIsSearch(false));
            dispatch(setMovies(originalMovies)); // Reset to original list
        }
    };

    const handleLoginOrLogout = () => {
        if (currentUser) {
            console.log(`logout`, currentUser);
            try {
                dispatch(logout(navigate) as unknown as UnknownAction);
            } catch (err) {
                console.error('Logout failed', err);
            }
        } else {
            navigate('/login');
        }
    };

    const toggleDrawer = (open: boolean) => () => {
        setIsDrawerOpen(open);
    };

    return (
        <>
            {loading && <Loader />}
            <AppBar position="static" color="primary">
                <Grid container justifyContent="space-between" alignItems="center" padding="1rem">
                    <Grid item xs={6} sm={3}>
                        <Box display="flex" alignItems="center">
                            <IconButton
                                onClick={toggleDrawer(true)}
                                edge="start"
                                color="inherit"
                                aria-label="menu"
                                sx={{ mr: 2, display: { md: 'none' } }}
                            >
                                <MenuIcon />
                            </IconButton>
                            <NavLink to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                                <h1 style={{ margin: 0 }}>Fmovies</h1>
                            </NavLink>
                        </Box>
                    </Grid>

                    <Grid item xs={12} sm={6} md={4}>
                        <Box display="flex" justifyContent={isSmallScreen ? 'center' : 'flex-start'}>
                            <form onChange={handleSubmit(onSubmit)} style={{ display: 'flex', alignItems: 'center', width: isSmallScreen ? '100%' : '20rem' }}>
                                <Controller
                                    name="searchTerm"
                                    control={control}
                                    defaultValue=""
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            type="text"
                                            label="Search"
                                            variant="outlined"
                                            fullWidth
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <SearchOutlinedIcon />
                                                    </InputAdornment>
                                                ),
                                                sx: {
                                                    '& input:focus': {
                                                        backgroundColor: 'white',
                                                    }
                                                }
                                            }}
                                            sx={{
                                                '& input': {
                                                    py: '10px',
                                                },
                                            }}
                                        />
                                    )}
                                />
                            </form>
                        </Box>
                    </Grid>

                    <Drawer anchor="left" open={isDrawerOpen} onClose={toggleDrawer(false)}>
                        <Box
                            sx={{ width: 250 }}
                            role="presentation"
                            onClick={toggleDrawer(false)}
                            onKeyDown={toggleDrawer(false)}
                        >
                            <List>
                                <ListItem button component={NavLink} to="/" onClick={toggleDrawer(false)}>
                                    <ListItemText primary="Home" />
                                </ListItem>
                                <ListItem button component={NavLink} to="/favmovie" onClick={toggleDrawer(false)}>
                                    <ListItemText primary="Favorite Movies" />
                                </ListItem>
                                <ListItem button onClick={handleLoginOrLogout}>
                                    <ListItemText primary={currentUser ? "Logout" : "Login"} />
                                </ListItem>
                            </List>
                        </Box>
                    </Drawer>

                    {!isSmallScreen && (
                        <Grid item xs={6} sm={3} md={2}>
                            <Box display="flex" justifyContent="flex-end">
                                <NavLink to="/favmovie" style={{ textDecoration: 'none' }}>
                                    <Button sx={{ color: 'white' }}>Favorite</Button>
                                </NavLink>
                            </Box>
                        </Grid>
                    )}

                    {!isSmallScreen && (
                        <Grid item xs={6} sm={3} md={3}>
                            <Box display="flex" justifyContent="flex-end">
                                <Button onClick={handleLoginOrLogout} sx={{ color: 'white' }}>{currentUser ? "Logout" : "Login"}</Button>
                            </Box>
                        </Grid>
                    )}
                </Grid>
            </AppBar>
        </>
    );
};

export default Navbar;
