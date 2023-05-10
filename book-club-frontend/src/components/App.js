import React, {useEffect, useState} from 'react'
import Home from './Home'
import NavBar from './NavBar'
import ToReadPage from './ToReadPage'
import NewBook from './NewBook'
import {Route,Switch,useHistory} from "react-router-dom"
import BookPage from "./BookPage"

function App() {

  const [books,setBooks]=useState([])
  const [currentBook,setCurrentBook]=useState({})
  const history=useHistory()

  useEffect(()=>{
    fetch("http://localhost:9294/books")
      .then((r)=>r.json())
      .then((data)=>setBooks(data))
  },[])
  

  function handleFormSubmit(book){
    setBooks([...books,book])
    setCurrentBook(book)
    console.log("form submitted")
  }
  
  function handleClick(event){
    setCurrentBook((books.filter((book)=>(book.title==event.target.alt)))[0])
    history.push('/book')
  }

  function onDeleteBook(id){
    setBooks(books.filter((book)=>(parseInt(book.id)!=id)))
    history.push('/to-read')
  }

  function handleNewNote(newNote,book_id){
    setBooks(books.map((book)=>{
        if (book.id==book_id){
          return {
          id:book.id,
          title:book.title,
          author:book.author,
          genre:book.genre,
          blurb:book.blurb,
          image_url:book.image_url,
          read:book.read,
          notes:[book.notes.push(newNote)]
          }}
        else
          {return book}
        }
      ))
      console.log(books.filter((book)=>book.id===book_id))
  }

  function finishedBook(event){

    console.log(currentBook.id)

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
        .then(setBooks(books.map((book)=>(book.id==event.target.id?{...book,["read"]:true}:book))))

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
        <Route exact path="/book">
          <BookPage currentBook={currentBook} onDeleteBook={onDeleteBook} finishedBook={finishedBook} onNewNote={handleNewNote}/>
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

