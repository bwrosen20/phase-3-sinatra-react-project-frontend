import React, {useState} from 'react'
import Note from './Note'
import NewNote from './NewNote'
import EditBook from './EditBook'

function BookPage({currentBook,onDeleteBook,handleUpdatedBook, finishedBook, onNewNote}){

    const [addNote,setAddNote]=useState(false)
    const [editBook,setEditBook]=useState(false)
    const [editedBook,setEditedBook]=useState(currentBook)
    const {id,title,author,genre,blurb,image_url,read,notes}=editedBook
    const [allNotes,setAllNotes]=useState(notes)

    function deleteBook(){
        fetch(`http://localhost:9294/books/${id}`,{
            method: "DELETE",
        })
        onDeleteBook(id)

    }

    function onAddNote(){
        setAddNote(!addNote)
    }

    function onEditChange(event){
        setEditedBook({...editedBook,[event.target.name]:event.target.value})
        console.log(editedBook)
    }

    function handleUpdatedBook(updatedBook){
        setEditBook(false)
        setEditedBook(updatedBook)
    }

    function handleDeleteNote(id){
        setAllNotes(allNotes.filter((note)=>note.id!=id))
    }

    function handleNewNote(addNote,id){
        setEditBook(false)
        onNewNote(addNote,id)
    }

return <div className="editcard">
    
    {editBook?
        <div>
        <EditBook book={editedBook} onEditChange={onEditChange} handleUpdatedBook={handleUpdatedBook}/>
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



    {allNotes.map((note)=>(
        <Note note={note} key={note.body} handleDeleteNote={handleDeleteNote}/>
    ))}
    {addNote?
    <div>
    <NewNote handleNewNote={handleNewNote} id={id}/>
    </div>:
    <div className="inline">
    {<button className="bottom" onClick={onAddNote}>Add Note</button>}
    {read?null:<button className="bottom" id={id} onClick={finishedBook}>Finished?</button>}
    </div>
    }   

    </div>
}

</div>

}

export default BookPage