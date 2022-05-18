import React, { useState } from 'react';
import { Box, TextField } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

const Marker = ({ lng, lat, setModal, setMarkers, markers }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const makeDescription = () => {
    setMarkers([
      ...markers,
      {
        latitude: lat,
        longitude: lng,
        title: title,
        description: description,
      },
    ]);
    setModal(false);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        position: 'fixed',
        width: '17vw',
        height: '22vh',
        background: 'rgb(199 210 217)',
        zIndex: '1',
        top: '75%',
        left: '35%',
        borderRadius: '20px',
      }}
    >
      <TextField
        id='standard-basic'
        label='Standard'
        variant='standard'
        onChange={(e) => setTitle(e.target.value)}
      />
      <TextField
        id='standard-basic'
        label='Standard'
        variant='standard'
        onChange={(e) => setDescription(e.target.value)}
      />
      <Box
        sx={{
          marginTop: '20px',
          display: 'flex',
          justifyContent: 'space-around',
          width: '15vw',
          height: '35px',
        }}
      >
        <CheckCircleIcon
          color='success'
          sx={{ fontSize: '40px' }}
          onClick={() => makeDescription()}
        />
        <CloseOutlinedIcon
          sx={{ fontSize: '40px' }}
          onClick={() => setModal(false)}
        />
      </Box>
    </Box>
  );
};

export default Marker;
