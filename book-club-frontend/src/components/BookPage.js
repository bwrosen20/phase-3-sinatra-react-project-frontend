import React, {useState} from 'react'
import {useParams} from 'react-router-dom'
import Note from './Note'
import NewNote from './NewNote'
import EditBook from './EditBook'

function BookPage({books, onDeleteBook, finishedBook, onNewNote, onUpdatedBook, handleDeleteNote}){

    const {id}=useParams()
    const book=books.find((book)=>book.id===parseInt(id))
    const [addNote,setAddNote]=useState(false)
    const [editBook,setEditBook]=useState(false)
    const {title,author,genre,blurb,read,image_url,notes}=book

    

    function deleteBook(){
        fetch(`http://localhost:9294/books/${id}`,{
            method: "DELETE",
        })
        onDeleteBook(id)

    }

    function handleUpdatedBook(updatedBook){
        setEditBook(false)
        onUpdatedBook(updatedBook)
    }

    function handleNewNote(addNote, bookID){
        setAddNote(false)
        onNewNote(addNote, bookID)
    }



return <div className="editcard">
    
    {editBook?
        <div>
        <EditBook book={book} handleUpdatedBook={handleUpdatedBook}/>
        </div>
        :
    <div>
    <div className="parent">
    <img src={image_url} alt={title} className="biggerimg"></img>
    <button className="close" onClick={deleteBook}>X</button>
    </div>

    <div className="editcontainer">
    <h4>{title}</h4>
    <h5>By {author}</h5>
    <h5>{genre}</h5>
    <p>{blurb}</p>
    <button onClick={(()=>setEditBook(true))} className="submit">Edit Book</button>
    </div>



    {notes?(notes.map((note)=>(
        <Note note={note} key={note.body} bookID={id} handleDeleteNote={handleDeleteNote}/>
    ))):null}
    {addNote?
    <div>
    <NewNote handleNewNote={handleNewNote} id={id} book={book}/>
    </div>:
    <div className="inline">
    {<button className="bottom" onClick={()=>setAddNote(!addNote)}>Add Note</button>}
    {read?null:<button className="bottom" id={id} onClick={finishedBook}>Finished?</button>}
    </div>
    }   

    </div>
}

</div>

}

export default BookPage