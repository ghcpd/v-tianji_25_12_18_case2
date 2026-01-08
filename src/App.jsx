import React from 'react'
import { StoreProvider } from './state/store'
import Header from './components/Header'
import WordList from './components/WordList'
import Flashcard from './components/Flashcard'
import Quiz from './components/Quiz'
import Progress from './components/Progress'
import ReviewQueue from './components/ReviewQueue'

export default function App() {
  return (
    <StoreProvider>
      <div className="container" data-testid="app-root">
        <div className="header">
          <div className="logo">
            <div className="mark">VL</div>
            <div>
              <div className="h1">VocabLab</div>
              <div className="h2">Study. Quiz. Track progress. Review difficult words.</div>
            </div>
          </div>
          <Header />
        </div>

        <div className="grid">
          <div>
            <div className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontWeight: 700 }}>Study</div>
                  <div className="small" style={{ marginTop: 6 }}>Browse word lists and mark items to review later.</div>
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <Quiz />
                </div>
              </div>

              <div className="sep" />

              <WordList />
            </div>

            <div style={{ height: 16 }} />

            <div className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontWeight: 700 }}>Flashcards</div>
                  <div className="small" style={{ marginTop: 6 }}>Quick recall with large, focused cards.</div>
                </div>
                <div className="kv">
                  <Progress />
                </div>
              </div>

              <div className="sep" />

              <Flashcard />
            </div>
          </div>

          <div>
            <div className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontWeight: 700 }}>Review Queue</div>
                  <div className="small" style={{ marginTop: 6 }}>Words you marked as difficult for targeted practice.</div>
                </div>
                <div className="kv">
                  <div className="badge">Auto-synced</div>
                </div>
              </div>

              <div className="sep" />

              <ReviewQueue />
            </div>

            <div style={{ height: 16 }} />

            <div className="card center" style={{ flexDirection: 'column', gap: 12 }}>
              <div style={{ fontWeight: 700 }}>Quick Progress</div>
              <div className="small">Track your overall learning across lists.</div>

              <div style={{ width: '100%' }}>
                <Progress compact />
                <div style={{ height: 8 }} />
                <div className="small">Keep practicing — progress updates after each quiz attempt.</div>
              </div>
            </div>

            <div className="footer">Built as a frontend-only demo with in-memory data • No backend required</div>
          </div>
        </div>
      </div>
    </StoreProvider>
  )
}
