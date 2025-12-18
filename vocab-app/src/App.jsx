import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Study from './components/Study';
import Quiz from './components/Quiz';
import Progress from './components/Progress';
import Review from './components/Review';
import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/study" element={<Study />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/progress" element={<Progress />} />
        <Route path="/review" element={<Review />} />
      </Routes>
    </div>
  );
}

export default App;
