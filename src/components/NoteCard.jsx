/* eslint-disable react/prop-types */
import { useContext, useEffect, useRef, useState } from 'react'
import Spinner from '../icons/Spinner.jsx'
import { bodyParser } from '../utils.js'
import { db } from '../appwrite/databases.js'
import DeleteButton from './DeleteButton.jsx'
import { NoteContext } from '../context/NoteContext.jsx'

// Taking a note object as props
const NoteCard = ({ note }) => {
    const { setSelectedNote } = useContext(NoteContext)
    const [saving, setSaving] = useState(false)
    const keyUpTimer = useRef(null)

    const handleKeyUp = async () => {
        setSaving(true)

        if (keyUpTimer.current) {
            clearTimeout(keyUpTimer.current)
        }

        keyUpTimer.current = setTimeout(() => {
            saveData("body", textAreaRef.current.value)
        }, 2000)
    }

    // textarea reference to alter height of card based on content 
    const textAreaRef = useRef(null)

    // setting height of card on initial load
    useEffect(() => {
        autoGrow(textAreaRef)
    }, [])

    // function to calculate height of card
    function autoGrow(textAreaRef) {
        const { current } = textAreaRef;    // current card
        current.style.height = "auto"
        current.style.height = current.scrollHeight + "px";
    }


    // getting position coordinates of card to move it with mouse
    const [position, setPosition] = useState(JSON.parse(note.position))

    // reference of card header
    const cardRef = useRef(null)

    let mouseInit = { x: 0, y: 0 }
    let mouseFinal = { x: 0, y: 0 }
    let newPosition = { x: 0, y: 0 }

    // onMouseDown on card header
    const mouseDown = (e) => {
        mouseInit = {
            x: e.clientX,
            y: e.clientY
        }
        setSelectedNote(note)
        document.addEventListener('mousemove', mouseMove)
        document.addEventListener('mouseup', mouseUp)
    }
    // set position of card to position of mouse
    const mouseMove = (e) => {
        mouseFinal = {
            x: e.clientX,
            y: e.clientY
        }
        let movement = {
            x: mouseFinal.x - mouseInit.x,
            y: mouseFinal.y - mouseInit.y
        }
        if (position.x + movement.x > 0 && position.y + movement.y > 0) {
            newPosition = {
                x: position.x + movement.x,
                y: position.y + movement.y
            }
            setPosition(newPosition)
        }
    }
    // drop card from mouse
    const mouseUp = () => {
        document.removeEventListener('mousemove', mouseMove)
        document.removeEventListener('mouseup', mouseUp)
    }

    const saveData = async (key, value) => {
        const payload = { [key]: JSON.stringify(value) }
        try {
            await db.notes.update(note.$id, payload)
        } catch (error) {
            console.log(error)
        }
        setSaving(false)
    }

    const colors = JSON.parse(note.colors)
    const body = bodyParser(note.body)

    return (
        <div
            ref={cardRef}
            className="card"
            style={{
                backgroundColor: colors.colorBody,
                left: `${position.x}px`,
                top: `${position.y}px`
            }}>
            <div
                className="card-header"
                style={{ backgroundColor: colors.colorHeader }}
                onMouseDown={mouseDown}
            >
                <DeleteButton
                    noteId={note.$id} />
                {saving && (
                    <div className='card-saving'>
                        <Spinner color={colors.colorText} />
                        <span style={{ color: colors.colorText }}>Saving...</span>
                    </div>
                )}
            </div>
            <div className="card-body">
                <textarea
                    style={{ color: colors.colorText }}
                    defaultValue={body}
                    ref={textAreaRef}
                    onInput={() => autoGrow(textAreaRef)}
                    onFocus={() => setSelectedNote(note)}
                    onKeyUp={handleKeyUp}>
                </textarea>
            </div>
        </div>
    )
}

export default NoteCard