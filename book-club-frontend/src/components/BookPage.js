import React, {useState} from 'react'
import Note from './Note'
import NewNote from './NewNote'
import EditBook from './EditBook'

function BookPage({setCurrentBook, currentBook,onDeleteBook, finishedBook, onNewNote, onUpdatedBook, handleDeleteNote}){

    const [addNote,setAddNote]=useState(false)
    const [editBook,setEditBook]=useState(false)
    const {id,title,author,genre,blurb,image_url,read,notes}=currentBook
    

    function deleteBook(){
        fetch(`http://localhost:9294/books/${id}`,{
            method: "DELETE",
        })
        onDeleteBook(id)

    }
    function onEditChange(event){
        setCurrentBook({...currentBook,[event.target.name]:event.target.value})
    }

    function handleUpdatedBook(updatedBook){
        setEditBook(false)
        onUpdatedBook(updatedBook)
    }

    function handleNewNote(addNote){
        setAddNote(false)
        onNewNote(addNote)
    }



return <div className="editcard">
    
    {editBook?
        <div>
        <EditBook book={currentBook} onEditChange={onEditChange} handleUpdatedBook={handleUpdatedBook}/>
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
    <button onClick={(()=>setEditBook(true))}>Edit Book</button>
    </div>



    {notes.map((note)=>(
        <Note note={note} key={note.body} handleDeleteNote={handleDeleteNote}/>
    ))}
    {addNote?
    <div>
    <NewNote handleNewNote={handleNewNote} id={id} book={currentBook}/>
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