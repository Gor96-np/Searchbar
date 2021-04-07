import React from 'react';

import Eye from '../assets/eye.png';
import Star from '../assets/star.png';

const Favorite = React.memo(props => {

    return (

        <div className="Tablelists">
        { props.tables.map(key => (
           <div key={key.id} className="Tableelem">
                <h2 onClick={() => props.nameClick(key.id,key.name,key.lang)}>{key.name}</h2>
                <h4>{key.owner}</h4>
                <h3>{key.lang}</h3>
                <button disabled={props.disabled} className="Favatr" 
                         onClick={() => props.favClick(key.id,key.name,key.owner,key.lang,key.star)}>
                    {props.buttonName}
                </button>
                <span className="Star">
                <img alt="Star" src={Star}/> <p>{key.star}</p>
                </span>
                <span className="Eye">
                   <img alt="Eye"src={Eye}/><p>{ Math.floor(Math.random() * 10)}</p>
                </span>
            </div>
        ))}
                
    </div>
        )
}) 
export default Favorite;