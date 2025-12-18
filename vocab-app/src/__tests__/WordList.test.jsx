import React from 'react'
import { render, fireEvent, screen, waitFor } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { VocabContextProvider } from '../context/VocabContext'
import WordList from '../WordList'

function renderWithContext(ui) {
  return render(<VocabContextProvider>{ui}</VocabContextProvider>)
}

describe('WordList', () => {
  it('shows initial words and allows adding a new word', async () => {
    renderWithContext(<WordList />)

    // initial words are 3
    const items = await screen.findAllByTestId('word-item')
    expect(items).toHaveLength(3)

    // add a new word
    fireEvent.change(screen.getByPlaceholderText('Word'), { target: { value: 'new' } })
    fireEvent.change(screen.getByPlaceholderText('Definition'), { target: { value: 'def' } })
    fireEvent.change(screen.getByPlaceholderText('Example'), { target: { value: 'ex' } })
    fireEvent.click(screen.getByText('Add'))

    const newItems = await screen.findAllByTestId('word-item')
    expect(newItems).toHaveLength(4)
  })

  it('can mark words as learned/difficult', async () => {
    renderWithContext(<WordList />)

    const firstLearnBtn = (await screen.findAllByText('Mark Learned'))[0]
    fireEvent.click(firstLearnBtn)

    await waitFor(() => expect(firstLearnBtn.disabled).toBe(true))

    const firstDiffBtn = (await screen.findAllByText('Mark Difficult'))[0]
    fireEvent.click(firstDiffBtn)
    // Button label should now be 'Unmark Difficult'
    await waitFor(() => expect(firstDiffBtn.textContent).toBe('Unmark Difficult'))
  })
})
