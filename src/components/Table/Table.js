// import React,{ useState, useEffect,useMemo } from 'react';

// import './Table.css';
// import Search from '../Search/Search';
// import Tablelist from '../Tablelist/Tablelist';
// import { withRouter } from 'react-router-dom'

// const Tables = React.memo(props => {





//     return (
//         <div className="Table">    
//             <Search onLoadSearch={props.onFilter}/>
//             <Tablelist tables={props.tableData}
//                         favClick={(id,name,owner,lang,star) => props.favCLickhandler(id,name,owner,lang,star)}
//                          nameClick={(id,name,lang) => props.nameClickHandler(id,name,lang)}
//                           buttonName="Add To Favorite"/>        </div>
//     )
// });

// export default withRouter(Tables)