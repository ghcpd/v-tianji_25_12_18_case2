import React from 'react'

export default function Header() {
  return (
    <header className="bg-white border-b">
      <div className="max-w-4xl mx-auto p-4 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Vocab Coach</h1>
        <p className="text-sm text-slate-500">Study • Quiz • Review</p>
      </div>
    </header>
  )
}
