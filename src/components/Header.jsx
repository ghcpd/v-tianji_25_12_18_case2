import React from 'react'
import { useStore } from '../state/store'

export default function Header() {
  const { state } = useStore()
  const total = state.vocab.length
  const avg = Math.round((state.vocab.reduce((s, w) => s + w.progress, 0) / (total || 1)) * 1) / 1
  const difficult = state.reviewQueue.length
  return (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      <div style={{ textAlign: 'right' }}>
        <div style={{ fontWeight: 700, textAlign: 'right' }}>{avg}%</div>
        <div className="small">Overall mastery</div>
      </div>

      <div style={{ paddingLeft: 12, borderLeft: '1px solid rgba(255,255,255,0.03)' }}>
        <div style={{ fontWeight: 700, textAlign: 'right' }}>{total}</div>
        <div className="small">Words</div>
      </div>

      <div style={{ paddingLeft: 12, borderLeft: '1px solid rgba(255,255,255,0.03)' }}>
        <div style={{ fontWeight: 700, textAlign: 'right' }}>{difficult}</div>
        <div className="small">In review</div>
      </div>
    </div>
  )
}
