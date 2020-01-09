import React, {useState, useContext} from 'react';
import {MapDisplayContext} from "../context/MapDisplayContext";
import useInput from "../hooks/UseInput";

const TagSearch = props => {

    const [searchTag, setSearchState] = useInput('');
    const {handleTagSubmit, mapDisplayState} = useContext(MapDisplayContext);
    return (
        <div>
            <input
                id="searchTag"
                type="text"
                name="searchTag"
                placeholder="Filter marker by tag"
                onChange={setSearchState}
                value={searchTag}
            />
            <button onClick={handleTagSubmit}>submit</button>
        </div>
    )
};

export default TagSearch;
