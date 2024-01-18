import React from "react";
import Sidebar from "./components/Sidebar";
import Editor from "./components/Editor";
import { data } from "./data";
import Split from 'react-split';
import {nanoid} from "nanoid"

export default function App() {
    const [notes, setNotes] = React.useState([])
    const [currentNoteId, setCurrentNoteId] = React.useState(
        (notes[0] && notes[0].id) || ""
    )

    function createNewNote() {
        const newNote = {
            id: nanoid(),
            body: "# Type your markdown note's title here"
        }
        setNotes(prevNotes => [newNote, ...prevNotes])
        setCurrentNoteId(newNote.id)
    }

    function updateNote(text) {
        setNotes(prevNotes => prevNotes.map(note => {
            return note.id === currentNoteId
            ? { ...note, body: text }
            : note
        }))
    }

    function findCurrentNote() {
        return notes.find(note => {
            return note.id === currentNoteId
        }) || notes[0]
    }

    return (
        <main>
            {notes.length > 0 
            ?
            <Split
                sizes={[30, 70]}
                minSize={100}
                expandToMin={false}
                gutterSize={5}
                gutterAlign="center"
                snapOffset={30}
                dragInterval={1}
                direction="horizontal"
                cursor="col-resize"
                className="split"
            >
                <Sidebar 
                    notes={notes}
                    currentNote={findCurrentNote()} 
                    setCurrentNoteId={setCurrentNoteId}
                    onAddNote={createNewNote}
                />
                {
                    currentNoteId && 
                    notes.length > 0 &&
                    <Editor 
                        currentNote={findCurrentNote()} 
                        updateNote={updateNote} 
                    />
                }
            </Split>
            :
            <div className="no-notes">
                <h1>No notes found</h1>
                <button 
                   className="first-note"
                   onClick={createNewNote}
                >
                    Create one now
                </button>
            </div>
            }
        </main>
    )
}