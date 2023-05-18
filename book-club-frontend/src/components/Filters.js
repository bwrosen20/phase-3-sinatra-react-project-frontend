import React from 'react'

function Filters({filterData,handleChange}){





    return <div className="filterContainer">

            
            <input
                placeholder="Search"
                type="text"
                name="input"
                className="filterInput"
                value={filterData.input}
                onChange={handleChange}
            />
            <select
            placeholder="Sort By"
            name="filter"
            className="filterInput"
            value={filterData.filter}
            onChange={handleChange}>
                <option>Recently Finished</option>
                <option>Author</option>
                <option>Title</option>
                <option>Rating</option>
            </select>
            <button>Select</button>

    </div>
}

export default Filters