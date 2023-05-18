import React, {useState} from 'react'

function NewNote({handleNewNote, id}){

    const [addNote,setAddNote]=useState({
        body:"",
        rating:"",
        pages_read:""
    })


    function onEditChange(event){
        setAddNote({...addNote,[event.target.name]:event.target.value})
    }

    function handleEditSubmit(event){
        event.preventDefault()
        
        fetch(`http://localhost:9294/books/${id}`,{
            method:"POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(addNote),
        })
        .then((r)=>r.json())
        .then((addNote)=>handleNewNote(addNote,id))

    }

return <div className="editnote">
    <form onSubmit={handleEditSubmit}>
    <p className="ratingtitle">Rating:
    <input
        type="text"
        autoFocus
        name="rating"
        autoComplete="off"
        placeholder="Please input rating"
        value={addNote.rating}
        onChange={onEditChange}/>
    Through how many pages:
    <input
        type="text"
        name="pages_read"
        autoComplete="off"
        placeholder="Please input pages read"
        value={addNote.pages_read}
        onChange={onEditChange}/>
    
    
    Explanation:
        <input
        type="text"
        name="body"
        autoComplete="off"
        placeholder="Please input explanation"
        value={addNote.body}
        onChange={onEditChange}/>
        
        <button className="submit">Submit</button>
        </p>
    </form>
</div>

}

export default NewNote