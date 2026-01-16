import React from 'react'
import { VocabProvider } from './state/vocab'
import Header from './components/Header'
import Home from './views/Home'

export default function App() {
  return (
    <VocabProvider>
      <div className="min-h-screen bg-slate-50 text-slate-900">
        <Header />
        <main className="p-6 max-w-4xl mx-auto">
          <Home />
        </main>
      </div>
    </VocabProvider>
  )
}
