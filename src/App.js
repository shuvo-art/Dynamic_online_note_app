import React from "react";
import Sidebar from "./components/Sidebar";
import Editor from "./components/Editor";
import data  from "./data";
import Split from 'react-split';
import {nanoid} from "nanoid"

export default function App() {
    const [notes, setNotes] = React.useState(
        () => JSON.parse(localStorage.getItem("notes")) || []
    )

    const [currentNoteId, setCurrentNoteId] = React.useState(
        (notes[0] && notes[0].id) || ""
    )

    const [state, setState] = React.useState(() => console.log("state changes"))
    
    React.useEffect(() => {
        localStorage.setItem("notes", JSON.stringify(notes))
        console.log(JSON.stringify(notes[0].body))
    }, [notes])

    function createNewNote() {
        const newNote = {
            id: nanoid(),
            body: "# Type your markdown note's title here"
        }
        setNotes(prevNotes => [newNote, ...prevNotes])
        setCurrentNoteId(newNote.id)
    }

    // This doesn't rearrange the notes to top position
/*     function updateNote(text) {
        setNotes(prevNotes => prevNotes.map(note => {
            return note.id === currentNoteId
            ? { ...note, body: text }
            : note
        }))
    }
 */
    // This rearranges the notes to top position(option 1)
/*     function updateNote(text) {
        setNotes(prevNotes => {
            // Find the index of the note with the currentNoteId
            const index = prevNotes.findIndex(note => note.id === currentNoteId);
    
            // If the note with the currentNoteId is found, update its body and move it to the top
            if (index !== -1) {
                const updatedNote = { ...prevNotes[index], body: text };
                
                // Create a new array with the updated note at the beginning and the rest of the notes
                const updatedNotes = [
                    updatedNote,
                    ...prevNotes.slice(0, index),
                    ...prevNotes.slice(index + 1)
                ];
    
                return updatedNotes;
            }
    
            // If the note with the currentNoteId is not found, return the original array
            return prevNotes;
        });
    } */

    // This rearranges the notes to top position(option 2)
    function updateNote(text) {
        setNotes(prevNotes => {
            const newArray = []
            for (let i = 0; i < prevNotes.length; i++) {
               const oldNote = prevNotes[i]
               if (oldNote.id === currentNoteId) {
                     const newNote = {...oldNote, body: text}
                     newArray.unshift(newNote)
               } else {
                    newArray.push(oldNote)
               }
            }
            return newArray
        })
    }
    
    function deleteNote(event, noteId) {
        event.stopPropagation()
        // Your code here
        setNotes(prevNotes => prevNotes.filter(note => note.id !== noteId))
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
                    deleteNote={deleteNote}
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