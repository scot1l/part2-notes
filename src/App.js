import { useState, useEffect } from 'react'
import Note from './components/Note'
import axios from 'axios'
import noteService from './services/notes'

const url = "http://localhost:3001/notes"

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('a new note...')
  const [showAll, setShowAll] = useState(true)

  const hook = () => {
    console.log('effect')
    noteService.getAll()
      .then(allNote => {
        console.log('promise fulfilled')
        setNotes(allNote)
      })
  }

  useEffect(hook, [])


  const onInputChange = (e) => {
    e.preventDefault()
    console.log(e.target);
    setNewNote(e.target.value)
  }

  const addNote = (event) => {
    event.preventDefault()
    console.log("event target: ", event.target)
    const noteObj = {
      content: newNote,
      important: Math.random() > 0.5,
    }

    noteService.create(noteObj)
      .then((nt) => setNotes(notes.concat(nt)))
    setNewNote('')
  }

  const notesToShow = showAll ?
    notes : notes.filter(note => note.important)

  const toggleImportanceOf = id => {
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }
    noteService.update(id, changedNote)
      .then(changedNote => setNotes(notes.map(n => n.id !== note.id ? n : changedNote)))
  }

  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'import' : 'all'}
        </button>
      </div>
      <ul>
        <ul>
          {notesToShow.map(note =>
            <Note key={note.id} note={note} toggleImportance={() => toggleImportanceOf(note.id)} />
          )}
        </ul>
      </ul>
      <form onSubmit={addNote}>
        <input
          value={newNote}
          onChange={onInputChange}
        />
        <button type='submit'>save</button>
      </form>
    </div>
  )
}

export default App
