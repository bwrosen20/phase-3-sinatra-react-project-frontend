import React, {useState} from 'react'

function EditBook({book, onEditChange, handleUpdatedBook}){


   const {id,author,title,genre,blurb,image_url,read,notes}=book

const [formData,setFormData]=useState({
    id:id,
    title:title,
    author:author,
    genre:genre,
    blurb:blurb,
    image_url:image_url,
    read:read,
    notes:notes
})


function onEditChange(event){
    setFormData({...formData,[event.target.name]:event.target.value})
}

    function handleEditSubmit(event){
        event.preventDefault()
        
        fetch(`http://localhost:9294/books/${id}`,{
            method:"PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        })
        .then((r)=>r.json())
        .then((updatedBook)=>handleUpdatedBook(updatedBook))

    }

return <div className="editnote">
    <form onSubmit={handleEditSubmit}>
    <p className="ratingtitle">Image URL:
    <input
        type="text"
        autoFocus
        name="image_url"
        autoComplete="off"
        value={formData.image_url}
        onChange={onEditChange}/>
    Title
    <input
        type="text"
        name="title"
        autoComplete="off"
        value={formData.title}
        onChange={onEditChange}/>
    
    
    Author
        <input
        type="text"
        name="author"
        autoComplete="off"
        value={formData.author}
        onChange={onEditChange}/>

    Blurb
        <input
        type="text"
        name="blurb"
        autoComplete="off"
        value={formData.blurb}
        onChange={onEditChange}/>   
        
        <button className="submit">Submit</button>
        </p>
    </form>
</div>

}

export default EditBook