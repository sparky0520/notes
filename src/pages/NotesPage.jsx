// import notes from '../assets/fakeData.js'
// import { databases } from '../appwrite/config.js'
import { db } from "../appwrite/databases.js"
import NoteCard from "../components/NoteCard.jsx"
import { useState, useEffect } from "react"

const NotesPage = () => {
  const [notes, setNotes] = useState([])

  useEffect(() => {
    init()
  }, [])

  async function init() {
    const response = await db.notes.list()
    setNotes(response.documents)
    console.log(response.documents)
  }
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