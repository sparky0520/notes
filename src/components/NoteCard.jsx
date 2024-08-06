/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from 'react'
import { Trash } from '../icons/Trash.jsx'

// Taking a note object as props
const NoteCard = ({ note }) => {


    // textarea reference to alter height of card based on content 
    const textAreaRef = useRef(null)

    // setting height of card on initial load
    useEffect(() => {
        autoGrow(textAreaRef)
    }, [])

    // function to calculate height of card
    function autoGrow(textAreaRef) {
        const { current } = textAreaRef;    // current card
        current.style.height = current.scrollHeight + "px"; 
    }


    // getting position coordinates of card to move it with mouse
    const [position, setPosition] = useState(JSON.parse(note.position))

    // reference of card header
    const cardRef = useRef(null)

    // onMouseDown on card header
    const mouseDown = () => {
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
    }

    const colors = JSON.parse(note.colors)
    const body = JSON.parse(note.body)

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
            </div>
            <div className="card-body">
                <textarea
                    style={{ color: colors.colorText }}
                    defaultValue={body}
                    ref={textAreaRef}
                    onInput={() => {
                        autoGrow(textAreaRef)
                    }}>
                </textarea>
            </div>
        </div>
    )
}

export default NoteCard