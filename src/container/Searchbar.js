import React, { useState,useCallback,useEffect,useMemo } from 'react';

import './Searchbar.css'
import Form from '../components/Form/Form';
import Tablelists from '../components/Tablelist/Tablelist';
import { withRouter } from 'react-router-dom';
import Search from '../components/Search/Search'

const Searchbar = (props) => {

  const [ data,setData ] = useState([]);
  const [ favoritData,setfavoritData ] = useState([]);
  
  useEffect(() => {
   fetch('https://react-task-838eb-default-rtdb.firebaseio.com/favdata/.json/')
   .then(response => { return response.json() })
   .then(resData => {
     const data = [];
     for(let key in resData) {
       data.push({
         id:resData[key].id,
         name:resData[key].name,
         owner:resData[key].owner,
         lang:resData[key].lang,
         star:resData[key].star,
         disabled:resData[key].disabled
       })
     }
     setfavoritData(data)
   })
  },[]);

  const favoritHandler = (id,name,owner,lang,star) => {
    const favData = {
        name:name,
        owner:owner,
        lang:lang,
        star:star,
    }
    localStorage.setItem('Data',JSON.stringify(favData));
    fetch('https://react-task-838eb-default-rtdb.firebaseio.com/favdata/.json/', {
            method:'POST',
            body:JSON.stringify(favData),
            headers:{ 'Content-Type':'application/json' }
    }).then(response => { return response.json() })};
    

const favClicked = () => {
  props.history.push('/favorite');
 fetch(`https://react-task-838eb-default-rtdb.firebaseio.com/favdata/.json/`)
   .then(response => { return response.json()})
   .then(res => {
       const favoritdata = []
       for(let pop in res) {
        favoritdata.push({
            id:pop,
            name:res[pop].name,
            lang:res[pop].lang,
            star:res[pop].star,
            owner:res[pop].owner,
            disabled:res[pop].disabled, 
         })}
       setfavoritData(favoritdata)
   })
};

const removeHandler = (id) => {
  fetch(`https://react-task-838eb-default-rtdb.firebaseio.com/favdata/${id}/.json/`, {
    method:'DELETE',
}).then(response => { return response.json() })
setfavoritData(favoritData.filter(elem => elem.id !== id))}

  const filterHandler = useCallback(filterOptions => {
    setData(filterOptions)
  },[setData]);

  const nameClickHandler = (id,name,language) => {
    props.history.push(`/search&language=${language}&&name=${name}`)
  }

  const forms = useMemo(() => {
    return (
              <Form optionFilter={data}
                     onLoadoptions={filterHandler}
                      filterValue={filterHandler}
                       stars={data}
                        favClickHandler={favClicked}/>
    )
  },[data,filterHandler,])

  const table = useMemo(() => {
    return (
      <div className="Table">
      <Search onLoadSearch={filterHandler}/>
      <Tablelists tables={data}
                    favClick={(id,name,owner,lang,star) => favoritHandler(id,name,owner,lang,star)}
                     nameClick={(id,name,lang) => nameClickHandler(id,name,lang)}
                      buttonName="Add to favorites"/>
      </div>    
    )
  },[data,filterHandler])

const favtable = useMemo(() => {
  return (
    <div className="Table">
    <Tablelists tables={favoritData}
                  buttonName="R e m o v e"
                   favClick={(id) => removeHandler(id)}/>
    </div>
  )
},[favoritData]);

let tablelists = null;
if(props.history.location.pathname ==='/') {
  tablelists = table
} 
if(props.history.location.pathname ==='/favorite'){
  tablelists = favtable
} else {
  tablelists = table
}

       return (
            <div className="Searchbar">
                   {forms}
                   { tablelists }
            </div>
        )
};

export default withRouter(Searchbar);