import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUp from './pages/user/SignUp'; // Adjust the path as necessary
import Login from './pages/user/Login';
import ShowMovies from './pages/Landing/ShowMovies';
import FavMovies from './pages/user/FavMovies';
import Navbar from './component/common/Navbar';
import MovieDetailCard from './component/common/MovieDetailsCard';
import PrivateRoute from './component/Routes/PrivateRoute';
import OpenRoute from './component/Routes/OpenRoute';
import Error from './component/common/Error';


// <Route element={
//   <PrivateRoute>
//     <ViewCourse />
//   </PrivateRoute>
// }>

function App() {
  return (
    <Router>
      <Navbar />
      {/* <Loader></Loader> */}
      <Routes>
        <Route path='/' element={<ShowMovies />} />

        {/* OpenRoute will protect routes for unauthenticated users */}
        <Route path='/login' element={<OpenRoute >


          {/* <Route path="/signup" element={<SignUp />} /> */}
          <Login />
        </OpenRoute>}>
        </Route>
        <Route path='/signup' element={<OpenRoute >
          <SignUp />
        </OpenRoute>}>
        </Route>


        {/* PrivateRoute will protect routes for authenticated users */}
        <Route path='/favmovie' element={<PrivateRoute  >
          <FavMovies />
        </PrivateRoute>}>
        </Route>
        <Route path='/movie-details/:_id' element={<MovieDetailCard />} />

        <Route path="*" element={<Error />} />
      </Routes>
    </Router>
  );
}

export default App;
