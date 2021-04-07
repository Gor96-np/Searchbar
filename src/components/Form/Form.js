import React, { useState, useEffect } from 'react';

import Inputrange from '../Inputrange/InputRange';
import './Form.css';
import  Fav  from '../assets/addFav.png';
import {withRouter} from 'react-router-dom'

const Form = React.memo(props => {
    const [optionLang, setoptionLang] = useState('')
    const [optionName, setoptionName] = useState('')
    const [optionOwner, setoptionOwner] = useState('')
    const { onLoadoptions } = props;


    useEffect(() => { 
        let query = optionLang.length === 0 ? '': `?orderBy="language"&equalTo="${optionLang}"`
        if(optionName) {query = optionName.length === 0 ? '': `?orderBy="name"&equalTo="${optionName}"`}
        if(optionOwner) {query = optionOwner.length === 0 ? '': `?orderBy="owner"&equalTo="${optionOwner}"`} 
            fetch(`https://react-task-838eb-default-rtdb.firebaseio.com/data/.json` +query)
                .then((response) => { return response.json()})
                   .then((data) => { const loadedData = [];
                       for (let key in data) { loadedData.push({
                               id: key,
                               name: data[key].name,
                               owner: data[key].owner,
                               lang: data[key].language,
                               imgData:data[key].imgData,
                               star:data[key].star,
                            })
                     }
             onLoadoptions(loadedData)});
     }, [optionLang,optionName,optionOwner,onLoadoptions]);

    const optionsLang = [
        {lang:'Javascript',type:'javascript'},
        {lang:'React',type:'react'},
        {lang:'Node.js',type:'node.js'},
        {lang:'Ruby',type:'ruby'},
        {lang:'Vue.js',type:'vue.js'},
        {lang:'Python',type:'python'},
        {lang:'Angular',type:'angular'},
        {lang:'.Net',type:'.Net'},
    ];
   const optionsName = [
    {name:'Amazone',type:'amazone'},
    {name:'Facebook',type:'facebook'},
    {name:'Microsoft',type:'microsoft'},
    {name:'Instagram',type:'instagram'},
    {name:'Twitter',type:'twitter'},
    {name:'Apple',type:'apple'},
    {name:'Aliexpress',type:'aliexpress'},
    {name:'Adobe',type:'adobe'},
    {name:'Wildberries',type:'wildberries'},
];

const optionsOwner = [
    {owner:'John',type:'john'},
    {owner:'Mark',type:'mark'},
    {owner:'Bill',type:'bill'},
    {owner:'Enthony',type:'enthony'},
    {owner:'Stephanie',type:'stephanie'},
    {owner:'Steve',type:'steve'},
    {owner:'Jack',type:'jack'},
    {owner:'Jorj',type:'jorj'},
    {owner:'Anna',type:'anna '},
    {owner:'Maria',type:'maria'},
];
    

const searchBarClick = () => {
    props.history.push('/')
}

    return (
        <div className="Formcont">
            <form className="Form">
               <h1 onClick={searchBarClick}>Searchbar</h1>
               <h3 className="Favimg" onClick={props.favClickHandler}><img src={Fav} alt="Fav"/>Favorite</h3>
                <label>Languages</label>
                <select  onChange={event => setoptionLang(event.target.value)}>
                    { optionsLang.map(filt => {
                        return (
                        <option key={filt.type}
                                 value={filt.optionLang}>
                              {filt.lang}
                        </option>    )
                        
             })}
                </select>
                <label>Names</label>
               <select value={optionName} onChange={event => setoptionName(event.target.value)}>
                    { optionsName.map(filt => (
                           <option  key={filt.type}
                                     value={filt.optionName}> 
                                      {filt.name}
                            </option>                   
                   )) } 
                </select>
               <label>Owner</label>
               <select onChange={event => setoptionOwner(event.target.value)}>
                      { optionsOwner.map(filt => (
                      <option  key={filt.type}
                                value={filt.optionOwner}> 
                                 {filt.owner}
                       </option>
                   )) }
                </select>
                <div className="Inputrange">
                <Inputrange onloadRangeValue={props.filterValue}/>
                </div>
     </form>
        </div>
    )
});

export default withRouter(Form);