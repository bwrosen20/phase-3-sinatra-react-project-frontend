import React from 'react'

function EditNote({handleUpdatedNote,onEditChange,newNote}){


const {id,pages_read,rating,body}=newNote

    function handleEditSubmit(event){
        event.preventDefault()
        
        fetch(`http://localhost:9293/notes/${id}`,{
            method:"PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                pages_read:pages_read,
                body:body,
                rating:rating
            }),
        })
        .then((r)=>r.json())
        .then((updatedNote)=>handleUpdatedNote(updatedNote))

    }

return <div className="editnote">
    <form onSubmit={handleEditSubmit}>
    <p className="ratingtitle">Rating:
    <input
        type="text"
        name="rating"
        autoComplete="off"
        value={rating}
        onChange={onEditChange}/>
    Through how many pages:
    <input
        type="text"
        name="pages_read"
        autoComplete="off"
        value={pages_read}
        onChange={onEditChange}/>
    
    
    Explanation:
        <input
        type="text"
        name="body"
        autoComplete="off"
        value={body}
        onChange={onEditChange}/>
        
        <button className="submit">Submit</button>
        </p>
    </form>
</div>

}

export default EditNote