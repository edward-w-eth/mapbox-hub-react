import React from 'react';
import {Route, Routes} from 'react-router-dom'
import Map from './Map';
import Building from './Building';
import Navbar from './components/Navbar';

function App() {
  return (
    <>
      <Navbar/>
      <div>
        <Routes>        
          <Route path="/" element={<Map />}/>
          <Route path="/building"  element={<Building />}/>
        </Routes>
      </div>
    </>
  );
}

export default App;