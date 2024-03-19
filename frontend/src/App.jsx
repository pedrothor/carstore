import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Cars from './components/cars/Cars';
import Units from './components/units/Units';
import Employees from './components/employees/Employees';
import Navbar from './components/navbar/Navbar';

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Cars />} />
        <Route path="/units" element={<Units />} />
        <Route path="/employees" element={<Employees />} />
      </Routes>
    </Router>
  );
}
