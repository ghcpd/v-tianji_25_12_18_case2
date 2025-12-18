import React, { useState } from 'react'
import { StoreProvider } from './state/store'
import Header from './components/Header'
import WordListView from './views/WordListView'
import StudyView from './views/StudyView'
import QuizView from './views/QuizView'
import ReviewView from './views/ReviewView'

function Content({ view }: { view: string }) {
  switch (view) {
    case 'study':
      return <StudyView />
    case 'quiz':
      return <QuizView />
    case 'review':
      return <ReviewView />
    default:
      return <WordListView />
  }
}

export default function App() {
  const [view, setView] = useState('list')
  return (
    <StoreProvider>
      <div className="app-shell">
        <Header />
        <div className="flex gap-6">
          <aside className="w-44">
            <div className="card mb-4">
              <button className="block w-full text-left p-2" onClick={() => setView('list')}>Word List</button>
              <button className="block w-full text-left p-2" onClick={() => setView('study')}>Study</button>
              <button className="block w-full text-left p-2" onClick={() => setView('quiz')}>Quiz</button>
              <button className="block w-full text-left p-2" onClick={() => setView('review')}>Review</button>
            </div>
            <div className="card">
              <div className="text-sm text-gray-600">Progress</div>
              <div className="progress-bar mt-2" style={{ width: '100%' }}>
                <div className="progress-fill" style={{ width: '30%' }} />
              </div>
            </div>
          </aside>
          <main className="flex-1">
            <Content view={view} />
          </main>
        </div>
      </div>
    </StoreProvider>
  )
}
