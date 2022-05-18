import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Error from './components/Error';
import Map from './components/Map';

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Map />} />
      <Route path='*' element={<Error />} />
    </Routes>
  );
};

export default App;
