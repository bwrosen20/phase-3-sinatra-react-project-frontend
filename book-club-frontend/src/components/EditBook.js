import React from 'react'

function EditBook({book, onEditChange, handleUpdatedBook}){


const {id,author,title,genre,blurb,image_url,read}=book

    function handleEditSubmit(event){
        event.preventDefault()
        
        fetch(`http://localhost:9293/books/${id}`,{
            method:"PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title:title,
                author:author,
                genre:genre,
                blurb:blurb,
                image_url:image_url,
                read:read
            }),
        })
        .then((r)=>r.json())
        .then((updatedBook)=>handleUpdatedBook(updatedBook))

    }

return <div className="editnote">
    <form onSubmit={handleEditSubmit}>
    <p className="ratingtitle">Image URL:
    <input
        type="text"
        name="image_url"
        autoComplete="off"
        value={image_url}
        onChange={onEditChange}/>
    Title
    <input
        type="text"
        name="title"
        autoComplete="off"
        value={title}
        onChange={onEditChange}/>
    
    
    Author
        <input
        type="text"
        name="author"
        autoComplete="off"
        value={author}
        onChange={onEditChange}/>

    Blurb
        <input
        type="text"
        name="blurb"
        autoComplete="off"
        value={blurb}
        onChange={onEditChange}/>   
        
        <button className="submit">Submit</button>
        </p>
    </form>
</div>

}

export default EditBook