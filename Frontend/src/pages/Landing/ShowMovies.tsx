import React, { useEffect, useState } from 'react';
import { Grid, Typography } from '@mui/material';
import MovieCard from '../../component/common/MovieCard';
// import { fetchFavMovie } from '../../services/operations/Moviesapi';
import {  useSelector } from 'react-redux';
// import { setMovies, setFavMovie, setLoading } from '../../redux/slices/movieSlice';
import { RootState } from '../../redux/store';
import Loader from '../../component/common/Loader';
// import axios from 'axios';
import { Movie } from '../../utils/interface/types';

const ShowMovies: React.FC = () => {
  const [allmovies, setAllmovie] = useState<Movie[]>([]); // Use Movie[] instead of any[]
const loading=useSelector((state:RootState)=>state.movies.loading)
const movieApi=useSelector((state:RootState)=>state.movies.movies)
// const issearch=useSelector((state:RootState)=>state.movies.issearch);
useEffect(() => {
 
  setAllmovie(movieApi);
}, [movieApi]);

  
  return (
    loading ? (
      <Loader />
    ) : (
      <Grid container spacing={2} sx={{ marginTop: "5px" }}>
        {allmovies.length > 0 ? (
          allmovies.map((ele, index) => (
            <Grid key={index} item xs={12}>
              <MovieCard
                Title={ele.Title}
                Poster={ele.Poster}
                Ratings={ele.Ratings[1].Value}
                Plot={ele.Plot}
                Year={ele.Year}
                _id={ele._id}
              />
            </Grid>
          ))
        ) : (
          <Grid item xs={12} container justifyContent="center" alignItems="center" sx={{ height: '100%' }}>
                    <Typography variant="h6" align="center">
                       Do not Match any movie
                    </Typography>
                </Grid>
        )}
      </Grid>
    )
  );
};

export default ShowMovies;
