import { useState } from 'react'

import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Page from './components/Page';
import Urls from './components/Urls';

function App() {

  
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Urls />} />
        <Route path="/page/:name" element={<Page />} />
        
      </Routes>
    </BrowserRouter>
  )
}

export default App
