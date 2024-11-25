import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/HomePage';
import Header from './components/layout/Header';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/createschool" element={<CreateSchool />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
