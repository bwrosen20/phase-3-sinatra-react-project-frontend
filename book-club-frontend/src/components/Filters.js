import React from 'react'

function Filters({filterData,handleChange}){





    return <div className="filterContainer">

            <label>Search By Title or Author
            <input
                placeholder="Search"
                type="text"
                name="input"
                className="filterInput"
                value={filterData.input}
                onChange={handleChange}
            />
            </label>
            <label>Sort By
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
            </label>

    </div>
}

export default Filters