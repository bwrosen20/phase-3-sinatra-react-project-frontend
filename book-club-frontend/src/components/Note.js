import React, {useState} from 'react'
import EditNote from "./EditNote"

function Note({note}){

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
   
return <div className="note">
    
    {isEditing?(
        <EditNote newNote={newNote} handleUpdatedNote={handleUpdatedNote} onEditChange={onEditChange}/>
    ):(
        <div className="textnote">
            <p className="ratingtitle">Rating through {newNote.pages_read} pages: {newNote.rating}</p>
    <p >{newNote.body}</p>
    <button onClick={amIEditing}>Edit Note</button>
    <button className="smallclose">X</button>
    </div>
    )}
    
</div>

}

export default Note