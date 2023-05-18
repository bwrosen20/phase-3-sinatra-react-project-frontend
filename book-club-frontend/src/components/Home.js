import React from 'react'
import Book from './Book'
import Filters from './Filters'

function Home({books, handleClick, handleChange, filterData}){


return <div>
    <div className="header">
        <span className="bookHeader">
    <h1 className="bigwords">Books I've Read</h1>
    <h2 className="bigwords">Click Image to Edit Book</h2>
        </span>
                <Filters filterData={filterData} handleChange={handleChange}/>
    </div>

<div className="bookgrid">
    {books.map((book)=>(
        book.read?<Book key={book.title} book={book} handleClick={handleClick}/>:null
    ))}

</div>
</div>

}

export default Home