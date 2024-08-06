import notes from '../assets/fakeData.js'
import NoteCard from "../components/NoteCard.jsx"

const NotesPage = () => {
  return (
    // Render a Note Card for each note object in array
    <div>
      {notes.map((note) => (
        <NoteCard note={note} key={note.$id} />
      ))}
    </div>
  )
}

export default NotesPage