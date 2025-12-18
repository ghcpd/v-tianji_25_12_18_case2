# Language Vocabulary Learning Web App

A modern, interactive web application for learning vocabulary using React, TypeScript, and Zustand state management.

## Features

### Core Learning Features
- **Vocabulary Lists Management**: Create and organize vocabulary lists
- **Multiple Study Modes**:
  - 📇 Flashcards: Flip cards to see translations
  - ✓ Multiple Choice: Select the correct answer
  - ⌨️ Typing: Type the correct answer

### Progress Tracking
- Learning progress visualization with progress bars
- Statistics on total words, mastered words, and difficult words
- Session tracking and study history

### Difficult Words Review
- Mark words as difficult for later review
- Dedicated review section for challenging vocabulary
- Spaced repetition support

## Project Structure

```
vocab-app/
├── src/
│   ├── components/           # React components
│   │   ├── VocabularyListSelector.tsx
│   │   ├── StudyMode.tsx
│   │   ├── FlashcardView.tsx
│   │   ├── MultipleChoiceQuiz.tsx
│   │   ├── TypingQuiz.tsx
│   │   ├── ProgressTracker.tsx
│   │   ├── DifficultWordsReview.tsx
│   │   ├── QuizResults.tsx
│   │   └── index.ts
│   ├── store/               # State management (Zustand)
│   │   └── vocabStore.ts
│   ├── types/              # TypeScript interfaces
│   │   └── index.ts
│   ├── data/               # Mock data
│   │   └── mockData.ts
│   ├── test/               # Unit tests
│   │   ├── setup.ts
│   │   ├── vocabStore.test.ts
│   │   ├── VocabularyListSelector.test.tsx
│   │   ├── FlashcardView.test.tsx
│   │   ├── MultipleChoiceQuiz.test.tsx
│   │   ├── TypingQuiz.test.tsx
│   │   ├── ProgressTracker.test.tsx
│   │   ├── DifficultWordsReview.test.tsx
│   │   └── StudyMode.test.tsx
│   ├── App.tsx             # Main application component
│   ├── index.css           # Global styles with Tailwind
│   └── main.tsx            # Application entry point
├── tailwind.config.js      # Tailwind CSS configuration
├── postcss.config.js       # PostCSS configuration
├── vitest.config.ts        # Vitest testing configuration
├── tsconfig.json           # TypeScript configuration
├── vite.config.ts          # Vite configuration
└── package.json            # Project dependencies
```

## Technology Stack

- **Frontend Framework**: React 19.2
- **Language**: TypeScript
- **Build Tool**: Vite 7.3
- **State Management**: Zustand 5.0
- **Styling**: Tailwind CSS 3
- **Testing**: Vitest 4.0, Testing Library
- **Package Manager**: npm

## Installation

```bash
# Navigate to project directory
cd vocab-app

# Install dependencies
npm install
```

## Running the Application

### Development Server
```bash
npm run dev
```
The application will be available at `http://localhost:5173/`

### Building for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm preview
```

## Testing

### Run Tests
```bash
npm test
```

### Run Tests in UI Mode
```bash
npm run test:ui
```

### Test Coverage
- **Total Tests**: 49
- **Test Files**: 8
- **All Tests Passing**: ✓

#### Test Breakdown:
- vocabStore.test.ts: 17 tests (State management and core logic)
- VocabularyListSelector.test.tsx: 4 tests (List selection and UI)
- FlashcardView.test.tsx: 4 tests (Flashcard interactions)
- MultipleChoiceQuiz.test.tsx: 4 tests (Multiple choice quiz)
- TypingQuiz.test.tsx: 5 tests (Typing quiz interactions)
- ProgressTracker.test.tsx: 4 tests (Progress visualization)
- DifficultWordsReview.test.tsx: 5 tests (Difficult words management)
- StudyMode.test.tsx: 6 tests (Study mode selection)

## Application Usage

### Getting Started
1. **Select a Vocabulary List**: Click on one of the available vocabulary lists
2. **Choose a Study Mode**: Select from Flashcards, Multiple Choice, or Typing
3. **Complete the Quiz**: Answer all questions in the selected mode
4. **Track Progress**: View your learning progress in the Progress tab
5. **Review Difficult Words**: Mark difficult words and review them later

### Study Modes

#### Flashcards
- Shows English word on the front
- Click to flip and see the translation
- Mark as correct when you know it

#### Multiple Choice
- Read the definition and select the correct translation
- Immediate feedback on your answer
- Move to next question

#### Typing
- Type the English word for the given translation
- Case-insensitive matching
- Shows correct answer after submission

## Data Model

The application uses the following main types:

```typescript
interface Word {
  id: string;
  english: string;
  translation: string;
  partOfSpeech: string;
  example: string;
  difficulty: 'easy' | 'medium' | 'hard';
  isMarked: boolean;
}

interface VocabularyList {
  id: string;
  name: string;
  words: Word[];
  createdAt: Date;
  studiedCount: number;
}

interface QuizSession {
  id: string;
  listId: string;
  type: 'flashcard' | 'multipleChoice' | 'typing';
  questions: QuizQuestion[];
  currentIndex: number;
  score: number;
  completed: boolean;
}

interface ProgressData {
  listId: string;
  totalWords: number;
  studiedWords: number;
  masteredWords: number;
  difficultWords: number;
  avgScore: number;
  lastStudied?: Date;
}
```

## State Management (Zustand)

The application uses Zustand for global state management with the following capabilities:

- **List Management**: Add, delete, and switch between vocabulary lists
- **Word Management**: Update words, toggle marks, retrieve marked words
- **Quiz Management**: Start quizzes, submit answers, track scores
- **Progress Tracking**: Calculate learning statistics
- **Review Queues**: Manage words for spaced repetition

## Styling

The application uses Tailwind CSS for styling with a modern, responsive design:

- **Color Scheme**: Blue and purple gradients
- **Responsive Layout**: Works on mobile, tablet, and desktop
- **Interactive Elements**: Smooth transitions and hover states
- **Accessibility**: High contrast and clear visual hierarchy

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

## Mock Data

The application includes mock vocabulary data in Spanish for demonstration:

### Common English Words (11 words)
- Serendipity, Ubiquitous, Ephemeral, Eloquent, Benevolent, Gregarious, Perspicacious, Mellifluous, and more

### Business Vocabulary (3 words)
- Leverage, Synergy, Scalability

All data is stored in-memory and resets on page refresh.

## Future Enhancements

- Backend integration for data persistence
- User authentication and accounts
- Spaced repetition algorithm
- Custom vocabulary list creation
- Multi-language support
- Audio pronunciation
- Dark mode
- Export/import vocabulary lists
- Leaderboards and achievements

## Development Notes

- All tests must pass before deployment
- TypeScript strict mode is enabled
- ESLint is configured for code quality
- Components follow React hooks best practices
- State is managed globally with Zustand

## Troubleshooting

### Dev server not starting
```bash
# Clear node_modules and reinstall
rm -r node_modules
npm install
npm run dev
```

### Tests failing
```bash
# Run tests with verbose output
npm test -- --reporter=verbose
```

### Tailwind styles not applying
```bash
# Rebuild Tailwind cache
npm run dev
```

## License

MIT

---

**Created**: December 2025
**Version**: 1.0.0
