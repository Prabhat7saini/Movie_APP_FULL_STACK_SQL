import React from 'react';
import { Grid, Typography } from '@mui/material';

const Error: React.FC = () => {
  return (
    <Grid
      container
      justifyContent="center"   // Center horizontally
      alignItems="center"       // Center vertically
      style={{ height: '100vh', backgroundColor: '#fff' }} // Full viewport height and background color
    >
      <Typography variant="h4" color="black">
        Error - 404 Not Found
      </Typography>
    </Grid>
  );
};

export default Error;
