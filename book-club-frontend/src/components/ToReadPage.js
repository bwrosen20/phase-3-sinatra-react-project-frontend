import React from 'react'
import Book from './Book'
import Filters from './Filters'

function ToReadPage({books, handleClick, filterData, handleChange}){

 
return <div>
    <span className="header">
        <span className="bookHeader">
      <h1 className="bigwords">Books I Want To Read</h1>
      <h2 className="bigwords">Click Image to Edit Book</h2>
        </span>
      <Filters handleChange={handleChange} filterData={filterData}/>
      </span>

<div className="bookgrid">
    {books.map((book)=>(
        book.read?null:<Book key={book.title} book={book} handleClick={handleClick}/>
    ))}

</div>

</div>

}

export default ToReadPage

