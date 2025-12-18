import React, { useState } from 'react'
import WordList from '../components/WordList'
import StudyView from './StudyView'
import QuizView from './QuizView'
import ReviewView from './ReviewView'
import ProgressView from './ProgressView'

export default function Home() {
  const [view, setView] = useState<'list' | 'study' | 'quiz' | 'review' | 'progress'>('list')

  return (
    <div>
      <nav className="flex gap-3 mb-4">
        <button className="btn" onClick={() => setView('list')}>Word Lists</button>
        <button className="btn" onClick={() => setView('study')}>Study</button>
        <button className="btn" onClick={() => setView('quiz')}>Quiz</button>
        <button className="btn" onClick={() => setView('review')}>Review</button>
        <button className="btn" onClick={() => setView('progress')}>Progress</button>
      </nav>

      <section className="bg-white rounded shadow p-4">
        {view === 'list' && <WordList />}
        {view === 'study' && <StudyView />}
        {view === 'quiz' && <QuizView />}
        {view === 'review' && <ReviewView />}
        {view === 'progress' && <ProgressView />}
      </section>
    </div>
  )
}
