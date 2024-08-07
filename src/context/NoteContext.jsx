/* eslint-disable react/prop-types */
import { db } from '../appwrite/databases'
import { useEffect, createContext, useState } from 'react'
import Spinner from '../icons/Spinner'

export const NoteContext = createContext()

const NoteProvider = ({ children }) => {
    const [selectedNote,setSelectedNote] = useState(null)

    const [loading, setLoading] = useState(true)
    const [notes, setNotes] = useState()
    
    useEffect(() => {
        init()
    }, [])

    async function init() {
        const response = await db.notes.list()
        setNotes(response.documents)
        setLoading(false)
        console.log(response.documents)
    }

    const contextData = { 
        notes, 
        setNotes,
        selectedNote,
        setSelectedNote 
    }

    return (
        <NoteContext.Provider value={contextData}>
            {loading ? (
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '100vh'
                    }}>
                    <Spinner size='100' />
                </div>
            ) : (
                children
            )}
        </NoteContext.Provider>
    )
}

export default NoteProvider