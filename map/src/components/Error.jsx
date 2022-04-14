import { Box, Typography } from '@mui/material';
import React from 'react';

const Error = () => {
  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgb(19, 26, 26)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box sx={{ color: 'white', fontSize: '55px', fontWeight: '600' }}>
        <Typography variant='h3'>Sorry, no such pages exist.</Typography>
      </Box>
    </Box>
  );
};

export default Error;
