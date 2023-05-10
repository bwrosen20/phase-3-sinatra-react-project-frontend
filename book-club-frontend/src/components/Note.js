import React, {useState} from 'react'
import EditNote from "./EditNote"

function Note({note, handleDeleteNote}){

    const [isEditing,setIsEditing]=useState(false)
    const [newNote,setNewNote]=useState({
        id:note.id,
        pages_read:note.pages_read,
        rating:note.rating,
        body:note.body
    })


    function amIEditing(){
        setIsEditing(!isEditing)
    }

    function onEditChange(event){
        setNewNote({...newNote,[event.target.name]:event.target.value})
    }

    function handleUpdatedNote(updatedNote){
        setIsEditing(false)
        setNewNote(updatedNote)
    }
   
    function onDeleteNote(){
            fetch(`http://localhost:9294/notes/${note.id}`,{
                method:'DELETE',
            })
            handleDeleteNote(note.id)
    }

return <div className="note">
    
    {isEditing?(
        <EditNote newNote={newNote} handleUpdatedNote={handleUpdatedNote} onEditChange={onEditChange}/>
    ):(
        <div className="textnote">
            <p className="ratingtitle">Rating through {newNote.pages_read} pages: {newNote.rating}</p>
    <p >{newNote.body}</p>
    <button onClick={amIEditing}>Edit Note</button>
    <button className="smallclose" onClick={onDeleteNote}>X</button>
    </div>
    )}
    
</div>

}

export default Note