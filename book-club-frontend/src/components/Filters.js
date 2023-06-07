import React from 'react'

function Filters({filterData,handleChange}){





    return <div className="filterContainer">

            <label>Search By Title or Author
            <input
                placeholder="Search"
                type="text"
                name="input"
                className="filterInput"
                autoComplete="off"
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
                <option>Choose Option</option>
                <option>Title</option>
                <option>Author</option>
                <option>Rating</option>
            </select>
            </label>

    </div>
}

export default Filters