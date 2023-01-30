import { createContext, useContext, useReducer } from 'react'

import { Note } from '../types/notes.types'

interface NoteContext {
  state: NoteState

  setNotes: (notes: Note[]) => void

  addNote: (note: Note) => void
  removeNote: (note: Partial<Note>) => void
  updateNote: (note: Note) => void
}

export const NoteContext = createContext<NoteContext | null>(null)

export const useNoteContext = () => useContext(NoteContext)

interface NoteState {
  notes: Note[]
}

interface NoteAction {
  type: 'ADD_NOTE' | 'REMOVE_NOTE' | 'UPDATE_NOTE'
  payload: Note
}

interface NotesAction {
  type: 'SET_NOTES'
  payload: Note[]
}

function noteReducer(state: NoteState, action: NoteAction | NotesAction) {
  const { type, payload } = action

  switch (type) {
    case 'SET_NOTES':
      return { ...state, notes: payload }
    case 'ADD_NOTE':
      // add new note to the top of the list
      return { ...state, notes: [payload, ...state.notes] }
    case 'REMOVE_NOTE':
      return { ...state, notes: state.notes.filter((note) => note.id !== payload.id) }
    case 'UPDATE_NOTE':
      return { ...state, notes: state.notes.map((note) => (note.id === payload.id ? payload : note)) }
    default:
      return state
  }
}

export default function NoteProvider({ children }) {
  const initialState: NoteState = {
    notes: [],
  }
  const [state, dispatch] = useReducer(noteReducer, initialState)

  // actions
  const setNotes = (notes: Note[]) => dispatch({ type: 'SET_NOTES', payload: notes })
  const addNote = (note: Note) => dispatch({ type: 'ADD_NOTE', payload: note })
  const removeNote = (note: Note) => dispatch({ type: 'REMOVE_NOTE', payload: note })
  const updateNote = (note: Note) => dispatch({ type: 'UPDATE_NOTE', payload: note })

  return (
    <NoteContext.Provider
      value={{
        state,
        setNotes,
        addNote,
        removeNote,
        updateNote,
      }}
    >
      {children}
    </NoteContext.Provider>
  )
}
