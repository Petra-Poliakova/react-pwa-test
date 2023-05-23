import React from 'react';
import { Routes, Route } from 'react-router-dom';

import './App.css';
import Home from './pages/Home'
import Comments from './pages/Comments'
import Nav from './Nav'


function App() {
    return ( 
      <>
      <header>
      <Nav/>
      </header>
      
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path='/Comments' element={<Comments/>}></Route>
      </Routes>
      </>
    
    );
  }

export default App;
