import React, {useState} from 'react'

function NewBook({handleFormSubmit}){
    const [input,setInput]=useState({
        id:"",
        title:"",
        author:"",
        genre:"",
        blurb:"",
        image_url:"",
        read:false,
        notes:[]
    })
    const [submitted,setSubmitted]=useState(false)

    function handleInput(event){
        setInput({
            ...input,[event.target.name]:event.target.value
        })
    }

    function bookWasAdded(){
        
        setTimeout(()=>{
            setSubmitted(false)
            setInput({
                id:"",
                title:"",
                author:"",
                genre:"",
                blurb:"",
                image_url:""
            })
        },2000)
    }

    function handleSubmit(event){
        event.preventDefault()
        setSubmitted(true)
        
        fetch("http://localhost:9294/books",{
            method:"POST",
            headers:{
                "Content-Type": "application/json",
            },
            body:JSON.stringify(input),
        })
        .then((r)=>r.json())
        .then(()=>handleFormSubmit(input))
        bookWasAdded()
    }


return <div>

    <form onSubmit={handleSubmit}>
        <label>
            Title:
        <input
        placeholder="Please input title"
        autoFocus
        autoComplete="off"
        type="text"
        name="title"
        value={input.title}
        onChange={handleInput}/>
        </label>


        <br></br>

        <label>
            Author:
        <input placeholder="Please input author"
        type="text"
        autoComplete="off"
        name="author"
        value={input.author}
        onChange={handleInput}/>
        </label>
            
        <br></br>
           
        <label>
            Genre:
        <input placeholder="Please input genre"
        type="text"
        autoComplete="off"
        name="genre"
        value={input.genre}
        onChange={handleInput}/>
        </label>

        <br></br>

        <label>
            Blurb:
        <input placeholder="Please input brief description"
        type="text"
        autoComplete="off"
        name="blurb"
        value={input.blurb}
        onChange={handleInput}/>
        </label>

        <br></br>

        <label>
            Image URL:
        <input placeholder="Please input image URL"
        type="text"
        name="image_url"
        value={input.image_url}
        onChange={handleInput}/>
        </label>

        <br></br>
        <br></br>

        <button>
        Submit
        </button>
    </form>
    <h4>{submitted?"Submitted":null}</h4>

</div>

}

export default NewBook

//what do I need on the form?

    //title
    //author
    //genre
    //blurb
    //image_url