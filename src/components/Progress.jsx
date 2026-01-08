import React from 'react'
import { useStore } from '../state/store'

export default function Progress({ compact }) {
  const { state } = useStore()
  const total = state.vocab.length || 1
  const avg = Math.round((state.vocab.reduce((s, w) => s + w.progress, 0) / total) || 0)
  const pct = Math.max(0, Math.min(100, avg))
  return (
    <div style={{ width: compact ? '120px' : '220px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
        <div className="small">Mastery</div>
        <div style={{ fontWeight: 700 }}>{pct}%</div>
      </div>
      <div className="progress" role="progressbar" aria-valuenow={pct} aria-valuemin="0" aria-valuemax="100">
        <i style={{ width: `${pct}%` }} />
      </div>
    </div>
  )
}
