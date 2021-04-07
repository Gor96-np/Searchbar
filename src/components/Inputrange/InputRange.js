import React,{ useState,useEffect } from 'react';

import './Inputrange.css'

const Inputrange = props => {

 const [range, setRange] = useState('');
 const { onloadRangeValue } = props;

 useEffect(() => {
     const timer = setTimeout(() => {
        if (range) {
            const query = range.length === 0 ? "": `?orderBy="star"&equalTo="${range}"`
            fetch(`https://react-task-838eb-default-rtdb.firebaseio.com/data/.json` + query)
                .then((response) => { return response.json();})
                .then((data) => {
                    const loadedData = [];
                    for (let key in data) {
                        loadedData.push({
                            id: key,
                            name: data[key].name,
                            owner: data[key].owner,
                            lang:data[key].language,
                            star: data[key].star,
                  })};
                    onloadRangeValue(loadedData) })}
     },300)
     return(() => {
      clearTimeout(timer)
    })
        
}, [range,onloadRangeValue]);

    return (
        <React.Fragment>
<div className="Inputrange">
         <label>Stars</label>
           <input onChange={event => setRange(event.target.value)} 
                   value={range}
                    type="range" min="0"
                     max="100" step="5"/>
              </div>           
             <span className="Span">Value:{range}</span>
        </React.Fragment>
        
    )
};

export default Inputrange;