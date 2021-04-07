import React,{ useState,useEffect,useRef } from 'react';

import './Search.css';

const Search = props => {
const { onLoadSearch } = props;
const [ searchInput,setSearchInput ] = useState('');
const searchRef = useRef()

    useEffect(() => {
        if(searchInput === searchRef.current.value){
            const query = searchInput.length === 0 ? ''
                : `?orderBy="name"&equalTo="${searchInput}"`
                fetch(`https://react-task-838eb-default-rtdb.firebaseio.com/data/.json` + query)
                .then(response => {
                    return response.json()
                })
                .then(resData => {
                    const searchData = [];
                    for(let key in resData) {
                        searchData.push({
                            id: key,
                            name: resData[key].name,
                            owner: resData[key].owner,
                            star: resData[key].star,
                            lang:resData[key].language,
                        });
                    }
                    onLoadSearch(searchData)
                })
            } 
    },[searchInput,onLoadSearch,searchRef])

    return (
        <div className="Search">
          <input onChange={event => setSearchInput(event.target.value)}
                  value={searchInput}
                   type="search" 
                    placeholder="Search..."
                     ref={searchRef} />
        </div>
    )
};

export default Search;