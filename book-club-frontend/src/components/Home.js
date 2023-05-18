import React from 'react'
import Book from './Book'

function Home({books, handleClick, filterWillShow}){

    filterWillShow(true)

return <div>

    <h1 className="bigwords">Books I've Read</h1>
    <h2 className="bigwords">Click Image to Edit Book</h2>


<div className="bookgrid">
    {books.map((book)=>(
        book.read?<Book key={book.title} book={book} handleClick={handleClick}/>:null
    ))}

</div>
</div>

}

export default Home