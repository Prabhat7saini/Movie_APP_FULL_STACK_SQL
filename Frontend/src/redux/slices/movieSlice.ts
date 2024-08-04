// import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { Movie, UserState } from "../../utils/interface/types";

// // Define the initial state for the user slice
// const initialState: UserState = {
//   loading: false,
//   Movies: [],
//   favMovie: []

// };

// // Create the user slice
// const userSlice = createSlice({
//   name: "movie",
//   initialState,
//   reducers: {
//     setLoading(state, action: PayloadAction<boolean>) {
//       state.loading = action.payload;
//     },
//     setMovie(state, action: PayloadAction<Movie[]>) {
//       state.Movies = action.payload
//       console.log(state.Movies,"redux")
//     },
//     setFavMovie(state, action: PayloadAction<Movie[]>) {
//       state.favMovie = action.payload
//     }
//   },
// });

// // Export actions
// export const { setLoading, setMovie,setFavMovie } = userSlice.actions;

// // Export reducer
// export default userSlice.reducer;


// movieSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FavMovieSql, Movie } from '../../utils/interface/types';

interface MovieState {
  movies: Movie[];
  loading: boolean;
  favMovie: FavMovieSql[];
  issearch:boolean
}

const initialState: MovieState = {
  movies: [],
  loading: false,
  favMovie: [],
  issearch:false
};

const movieSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    setMovies: (state, action: PayloadAction<Movie[]>) => {
      state.movies = action.payload;
    },
    setFavMovie: (state, action: PayloadAction<FavMovieSql[]>) => {
      state.favMovie = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setIsSearch(state,aciton:PayloadAction<boolean>){
      state.issearch=aciton.payload
    }
  }
});

export const { setMovies, setFavMovie, setLoading,setIsSearch } = movieSlice.actions;
export default movieSlice.reducer;
