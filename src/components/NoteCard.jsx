/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from 'react'
import { Trash } from '../icons/Trash.jsx'
import Spinner from '../icons/Spinner.jsx'
import { bodyParser, setZIndex } from '../utils.js'
import { db } from '../appwrite/databases.js'

// Taking a note object as props
const NoteCard = ({ note }) => {

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

    // onMouseDown on card header
    const mouseDown = () => {
        // Broken 
        setZIndex(cardRef.current)
        document.addEventListener('mousemove', mouseMove)
        document.addEventListener('mouseup', mouseUp)
    }
    // set position of card to position of mouse
    const mouseMove = (e) => {
        setPosition({
            x: e.clientX - 200,
            y: e.clientY - 20
        })
    }
    // drop card from mouse
    const mouseUp = () => {
        document.removeEventListener('mousemove', mouseMove)
        document.removeEventListener('mouseup', mouseUp)
        saveData("position", position)
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
                <Trash />
                {
                    saving && (
                        <div className='card-saving'>
                            <Spinner color={colors.colorText} />
                            <span style={{ color: colors.colorText }}>Saving...</span>
                        </div>
                    )
                }
            </div>
            <div className="card-body">
                <textarea
                    style={{ color: colors.colorText }}
                    defaultValue={body}
                    ref={textAreaRef}
                    onInput={() => {
                        autoGrow(textAreaRef)
                    }}
                    onKeyUp={handleKeyUp}
                    // Broken
                    onClick={() => {
                        setZIndex(cardRef.current)
                    }}>
                </textarea>
            </div>
        </div>
    )
}

export default NoteCard