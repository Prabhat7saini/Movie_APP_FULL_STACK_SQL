import { Container, Button, TextField, Typography } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import Box from '@mui/material/Box';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { LoginSchema } from '../../utils/schema/userSchema';
import { Logindata } from '../../utils/interface/types';
import { login } from '../../services/operations/Authapi';
import { RootState } from '../../redux/store';
import { setLoading } from '../../redux/slices/movieSlice';
import Loader from '../../component/common/Loader'; // Ensure you have a Loader component
import { UnknownAction } from 'redux';
import React from 'react';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loading = useSelector((state: RootState) => state.movies.loading);

  const { control, handleSubmit, formState: { errors } } = useForm<Logindata>({
    resolver: yupResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<Logindata> = async (data) => {
    try {
      dispatch(setLoading(true));
      const { email, password } = data;
      await dispatch(login(email, password, navigate) as unknown as UnknownAction);
    } catch (error) {
      console.error('Error during login:', error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <React.Fragment>
    {loading ? (<Loader />):(<Container maxWidth="sm" sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', mt: '2rem' }}>
      <Typography variant="h2" component="h2">
        Login
      </Typography>

      <Box
        sx={{
          width: '80%',
          maxWidth: '400px',
          padding: '2rem',
          border: '1px solid #ccc',
          boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
          borderRadius: '8px',
          backgroundColor: 'white',
          position: 'relative',
        }}
      >
      
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <Controller
                name="email"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    type="email"
                    label="Email"
                    variant="outlined"
                    fullWidth
                    error={!!errors.email}
                    helperText={errors.email ? errors.email.message : ''}
                  />
                )}
              />
              <Controller
                name="password"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    type="password"
                    label="Password"
                    variant="outlined"
                    fullWidth
                    error={!!errors.password}
                    helperText={errors.password ? errors.password.message : ''}
                  />
                )}
              />
              <Button type="submit" variant="contained" color="primary" fullWidth>
                Login
              </Button>
              <NavLink to='/signup'>Register</NavLink>
            </Box>
          </form>
        
      </Box>
    </Container>)}  
    
    </React.Fragment>
  );
};

export default Login;
