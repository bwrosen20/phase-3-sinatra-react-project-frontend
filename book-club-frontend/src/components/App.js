import React, {useEffect, useState} from 'react'
import Home from './Home'
import NavBar from './NavBar'
import ToReadPage from './ToReadPage'
import NewBook from './NewBook'
import {Route,Switch,useHistory} from "react-router-dom"
import BookPage from "./BookPage"

function App() {

  const [books,setBooks]=useState([])
  const history=useHistory()

  useEffect(()=>{
    fetch("http://localhost:9294/books")
      .then((r)=>r.json())
      .then((data)=>setBooks(data))
  },[])
  

  function handleFormSubmit(book){
    const idArray=books.map((book)=>book.id)
    const lastID=Math.max(...idArray)
    book.id=lastID+1
    setBooks([...books,book])
    console.log("form submitted")
  }

  function onUpdatedBook(updatedBook){
    console.log(updatedBook)
    const currentBook=books.find((book)=>book.id==updatedBook.id)
    const currentNotes=currentBook.notes

    setBooks(books.map((book)=>(book.id==updatedBook.id?{...updatedBook,["notes"]:currentNotes}:book)))

    console.log(books)
  }
  
  function handleClick(event){

    history.push(`/book/${event.target.alt}`)
  }

  function onDeleteBook(id){
    setBooks(books.filter((book)=>(parseInt(book.id)!==parseInt(id))))
    history.push('/to-read')
  }
  
  
  function handleDeleteNote(id,bookID){

    const currentBook=books.find((book)=>book.id===bookID)
    const newNotes=currentBook.notes.filter((note)=>note.id!==id)
    setBooks(books.map((book)=>book.id===currentBook.id?{...book,["notes"]:newNotes}:book))
  
}


  function onNewNote(addNote, bookID){


    const currentId=bookID
    const currentBook=books.find((book)=>book.id==bookID)
    console.log(currentBook)
  
    setBooks(books.map((book)=>{
        if (book.id==currentId){
          console.log("true")
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
          {console.log("false")
            return book}
        }
      ))

      console.log(books)
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
          <ToReadPage books={books} handleClick={handleClick}/>
        </Route>
        <Route exact path="/new-book">
          <NewBook handleFormSubmit={handleFormSubmit}/>
        </Route>
        <Route exact path="/book/:id">
          <BookPage books={books} onDeleteBook={onDeleteBook} finishedBook={finishedBook} onNewNote={onNewNote} onUpdatedBook={onUpdatedBook} handleDeleteNote={handleDeleteNote}/>
        </Route>
        <Route path="/">
          <Home books={books} handleClick={handleClick}/>
        </Route>
      </Switch>
      
     
      
    </div>
  );
}

export default App;


//book club app
    //users will read a new book every week
    //the homepage will show the last 7 books
    //there will be an option to show all/more
    //be able to filter books that have been read
    //shows what would currently be the next book (whichever has the most votes)
//Book review page
    //appears when book is clicked
    //it will show the average rating
    //it will show a list of everyones reviews
    //there will be the option to edit your own review
//login screen
    //sets the active user who can change their own review
//book recs screen
    //each user can vote up a book if they'd like to read it
    //be able to filter books recs

