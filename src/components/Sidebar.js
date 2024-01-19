import React from "react";

export default function Sidebar(props) {
    const noteElements = props.notes.map((note, index) => (
     <div key = {note.id}>
        <div 
            className={`title ${note.id === props.currentNote.id ? "selected-note" : ""}`} 
            onClick={() => props.setCurrentNoteId(note.id)}
        >
            <h4 className="text-snippet">{note.body.split('\n')[0]}</h4>
        </div>
     </div>   
    ))

    return (
        <section className="pane sidebar">
            <div className="sidebar-header">
                <h4>Markdown Notes</h4>
                <button className="new-note" onClick={props.onAddNote}>+</button>
            </div>
            {noteElements}
        </section>
    )
}