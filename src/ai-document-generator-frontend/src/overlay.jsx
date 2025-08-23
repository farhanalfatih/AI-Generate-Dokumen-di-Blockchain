import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './App';
import Upload from './page/upload/page';
import NotFound from './page/404/page'

const Overlay = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/upload" element={<Upload/>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Overlay;
