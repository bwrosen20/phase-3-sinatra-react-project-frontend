import React from 'react'
import Book from './Book'

function ToReadPage({books, handleClick, filterWillShow}){

    filterWillShow(true)
 
return <div>
      <h1 className="bigwords">Books I Want To Read</h1>
      <h2 className="bigwords">Click Image to Edit Book</h2>


<div className="bookgrid">
    {books.map((book)=>(
        book.read?null:<Book key={book.title} book={book} handleClick={handleClick}/>
    ))}

</div>

</div>

}

export default ToReadPage

