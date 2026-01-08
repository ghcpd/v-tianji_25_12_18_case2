import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import './App.css'
import { VocabContextProvider } from './context/VocabContext'
import Home from './Home'
import WordList from './WordList'
import Quiz from './Quiz'
import Review from './Review'

function App() {
  return (
    <VocabContextProvider>
      <Router>
        <div className="app-nav">
          <Link to="/">Home</Link> | <Link to="/words">Words</Link> | <Link to="/quiz">Quiz</Link> | <Link to="/review">Review</Link>
        </div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/words" element={<WordList />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/review" element={<Review />} />
        </Routes>
      </Router>
    </VocabContextProvider>
  )
}

export default App
