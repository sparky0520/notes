import NoteCard from "../components/NoteCard.jsx"
import { useContext } from "react"
import { NoteContext } from "../context/NoteContext.jsx"
import Controls from "../components/Controls.jsx"

const NotesPage = () => {
  const { notes } = useContext(NoteContext)
  return (
    <div>
      <img src="/tackit-logo.png" alt="TackIt Logo" style={{ position: "fixed", top: "20px", left: "20px", width: "60px", zIndex: 1000, pointerEvents: "none" }} />
      {notes.map((note) => (
        <NoteCard note={note} key={note.$id} />
      ))}
      <Controls />
    </div>
  )
}

export default NotesPage