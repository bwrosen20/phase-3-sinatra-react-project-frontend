import React, {useEffect, useState} from 'react'
import Home from './Home'
import NavBar from './NavBar'
import ToReadPage from './ToReadPage'
import NewBook from './NewBook'
import {Route,Switch,useHistory} from "react-router-dom"
import BookPage from "./BookPage"

function App() {

  const [books,setBooks]=useState([])
  const [filterData,setFilterData]=useState({
    input:"",
    filter:"Choose Option"
})
  const history=useHistory()

  useEffect(()=>{
    fetch("http://localhost:9294/books")
      .then((r)=>r.json())
      .then((data)=>setBooks(data))
  },[])
  

  function handleFormSubmit(book){
    book.notes=[]
    setBooks([...books,book])
  }

  function handleChange(event){
    setFilterData({...filterData,[event.target.name]:event.target.value})
}



      let booksToDisplay=(books.filter((book)=>(((book.title).toLowerCase().includes((filterData.input).toLowerCase()))||((book.author).toLowerCase().includes((filterData.input).toLowerCase())))))

        if (filterData.filter=="Author"){
            booksToDisplay=booksToDisplay.sort((a,b)=>(a.author > b.author ? 1 : -1))
        }
        else if (filterData.filter=="Title"){
            booksToDisplay=booksToDisplay.sort((a,b)=>(a.title > b.title ? 1: -1))
        }
        else {
            booksToDisplay.forEach((book)=>{
              book.notes.length>0 ? book.rating=(book.notes[book.notes.length-1].rating):book.rating=0
            })
            booksToDisplay=booksToDisplay.sort((a,b)=> b.rating - a.rating)
        }

  function onUpdatedBook(updatedBook){
    const currentBook=books.find((book)=>book.id==updatedBook.id)
    const currentNotes=currentBook.notes
    setBooks(books.map((book)=>(book.id==updatedBook.id?{...updatedBook,["notes"]:currentNotes}:book)))
  }
  
  function handleClick(event){

    history.push(`/book/${event.target.alt}`)
  }

  function onDeleteBook(id){
    setBooks(books.filter((book)=>(parseInt(book.id)!==parseInt(id))))
    history.push('/to-read')
  }
  
  
  function handleDeleteNote(id,bookID){

    const currentBook=books.find((book)=>book.id==bookID)
    const newNotes=currentBook.notes.filter((note)=>note.id!==id)
    setBooks(books.map((book)=>book.id===currentBook.id?{...book,["notes"]:newNotes}:book))
  
}


  function onNewNote(addNote, bookID){


    const currentId=bookID
    const currentBook=books.find((book)=>book.id==bookID)
  
    setBooks(books.map((book)=>{
        if (book.id==currentId){
          return {
          id:currentBook.id,
          title:book.title,
          author:book.author,
          genre:book.genre,
          blurb:book.blurb,
          image_url:book.image_url,
          read:book.read,
          notes:[...book.notes,addNote]
          }}
        else
          {
            return book}
        }
      ))

  }

  function finishedBook(event){

    console.log(event.target)

    const currentBook=books.find((book)=>book.id==event.target.id)

    console.log(currentBook)

    fetch(`http://localhost:9294/books/${currentBook.id}`,{
            method:"PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
              title:currentBook.title,
              author:currentBook.author,
              genre:currentBook.genre,
              blurb:currentBook.blurb,
              image_url:currentBook.image_url,   
              read:true
            }),
        })
        .then((r)=>r.json())
        .then(setBooks(books.map((book)=>(book.id===currentBook.id?{...book,["read"]:true}:book))))


    history.push('/')

  }


  
  return (
    
    <div>
      <NavBar />
      <Switch>
        <Route exact path="/to-read">
          <ToReadPage books={booksToDisplay} handleClick={handleClick} handleChange={handleChange} filterData={filterData}/>
        </Route>
        <Route exact path="/new-book">
          <NewBook handleFormSubmit={handleFormSubmit} />
        </Route>
        <Route exact path="/book/:id">
          <BookPage books={books} onDeleteBook={onDeleteBook} finishedBook={finishedBook} onNewNote={onNewNote} onUpdatedBook={onUpdatedBook} handleDeleteNote={handleDeleteNote} />
        </Route>
        <Route path="/">
          <Home books={booksToDisplay} handleClick={handleClick} handleChange={handleChange} filterData={filterData}/>
        </Route>
      </Switch>
      
     
      
    </div>
  );
}

export default App;

