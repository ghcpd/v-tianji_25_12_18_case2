import React from 'react'
import { useStore } from '../state/store'

export default function ReviewQueue() {
  const { state, dispatch } = useStore()
  const queue = state.vocab.filter((w) => w.difficult)
  if (!queue.length) return <div className="small">No items in review. Mark difficult words to add them here.</div>
  return (
    <div className="list">
      {queue.map((w) => (
        <div className="word" key={w.id} data-testid={`review-${w.id}`}>
          <div>
            <div style={{ fontWeight: 700 }}>{w.word}</div>
            <div className="small">{w.meaning}</div>
          </div>

          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <div className="small">{w.progress}%</div>
            <button className="btn smallbtn" onClick={() => dispatch({ type: 'MARK_REVIEWED', id: w.id })}>Mark reviewed</button>
          </div>
        </div>
      ))}
    </div>
  )
}
