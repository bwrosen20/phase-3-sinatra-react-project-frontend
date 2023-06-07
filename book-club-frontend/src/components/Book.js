import React from 'react'

function Books({book, handleClick}){

    const {id,title,author,genre,blurb,image_url,read,notes}=book
    const highRating=notes.length>0 ? (notes.map((note)=>note.rating)).pop() : 0

return <div className="card" value={title}>
    
    <img src={image_url} alt={id} onClick={handleClick} className="smallimg"></img>
    <div className="container" value={id}>
    <h4>{title}</h4>
    <h5>By {author}</h5>
    <h5>{genre}</h5>
    {read?<h4>Rating: {highRating}</h4>:null}
    <p>{blurb}</p>

    </div>

</div>

}

export default Books