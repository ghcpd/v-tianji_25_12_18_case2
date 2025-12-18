import React from 'react'

export default function Header() {
  return (
    <header className="header">
      <h1 className="text-2xl font-bold">Vocab Trainer</h1>
      <nav className="nav text-sm text-gray-600">
        <span>Study</span>
        <span>Quiz</span>
        <span>Review</span>
      </nav>
    </header>
  )
}
