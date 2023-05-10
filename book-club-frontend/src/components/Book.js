import React from 'react'

function Books({book, handleClick}){

    const {id,title,author,genre,blurb,image_url}=book

return <div className="card" value={title}>
    
    <img src={image_url} alt={title} onClick={handleClick}></img>
    <div className="container" value={id}>
    <h4>{title}</h4>
    <h5>By {author}</h5>
    <h5>{genre}</h5>
    <p>{blurb}</p>

    </div>

</div>

}

export default Books