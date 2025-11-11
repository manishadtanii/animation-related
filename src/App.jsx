import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import TextPhoto from './components/TextPhoto';

export default function App() {
  
 
  return (
    <div>
        <Routes>
          <Route path="/text" element={<TextPhoto  />} />
        </Routes>
    </div>
  );
}