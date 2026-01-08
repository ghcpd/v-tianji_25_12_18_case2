import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { waitFor } from '@testing-library/react'
import { VocabContextProvider } from '../context/VocabContext'
import Quiz from '../Quiz'

describe('Quiz', () => {
  it('shows a question and handles correct answer', async () => {
    render(
      <VocabContextProvider>
        <Quiz />
      </VocabContextProvider>
    )

    // the quiz shows the definition of the first unlearned word
    const question = await screen.findByTestId('quiz-question')
    expect(question.textContent).toContain('Definition:')

    const input = screen.getByPlaceholderText('Your answer')
    const submit = screen.getByText('Submit')

    // type correct answer of the current question
    fireEvent.change(input, { target: { value: input.value || 'aberration' } })
    fireEvent.click(submit)

    expect(await screen.findByTestId('quiz-feedback')).toHaveTextContent('Correct!')

    // wait for feedback to disappear (after 1s timeout)
    await waitFor(() => expect(screen.queryByTestId('quiz-feedback')).toBeNull(), { timeout: 2000 })
  })
})
