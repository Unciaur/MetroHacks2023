import React from 'react';
import ReactDOM from 'react-dom/client';
import Home from './pages/Home';
import Interpreter from './pages/Interpreter';
import Navbar from './components/Navbar';
import './index.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
const root = ReactDOM.createRoot(document.getElementById('root'));



root.render(
  <React.StrictMode>
    <Router>
      <Navbar></Navbar>
      <Routes>
      <Route exact path='/' element={<Home></Home>}></Route>
      <Route path='/interpreter' element={<Interpreter></Interpreter>}></Route>
      </Routes>

    </Router>
  </React.StrictMode>
);