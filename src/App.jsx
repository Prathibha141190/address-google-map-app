import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import Home from './components/Home'
import AddressForm from './components/AddressForm';
import LocationModal from './components/LocationModal';
import AddressManager from './components/AddressManager';
import LocationSelector from './components/LocationSelector';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/modal" element={<LocationModal/>} />
        <Route path="/selecter" element={<LocationSelector />} />
        <Route path="/address" element={<AddressForm />} />
        <Route path="/manage" element={<AddressManager />} />
      </Routes>
    </Router>
  );
}

export default App
