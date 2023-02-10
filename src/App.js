import { useState } from 'react'
import Note from './components/Note'
import axios from 'axios'

const url = "http://localhost:3001/notes"

const App = (props) => {
  const [notes, setNotes] = useState(props.notes)
  const [newNote, setNewNote] = useState('a new note...')
  const [showAll, setShowAll] = useState(true)


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

    axios.post(url, noteObj)
      .then((response) => setNotes(notes.concat(response.data)))
    setNewNote('')
  }

  const notesToShow = showAll ?
    notes : notes.filter(note => note.important)


  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'import': 'all'}
        </button>
      </div>
      <ul>
        <ul>
          {notesToShow.map(note =>
            <Note key={note.id} note={note} />
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
