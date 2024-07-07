import React, {createContext, useContext, useEffect, useState} from 'react';


const columnsData = [
    {id:"1a",title:"to do", items: [{id:1 ,description:"taks one"}, {id:2 ,description:"task two"}, {id:3 ,description:"task three"}]},
    {id:"2b",title:"in process", items: [{id:4 ,description:"taks four"}]},
    {id:"3c",title:"done", items: [{id:5,description:"taks five"}, {id:6 ,description:"taks six"}, {id:7 ,description:"taks seven"},{id:8 ,description:"taks eight"}] },
]
//[{id:1 ,description:"taks one"}, {id:2 ,description:"task two"}, {id:3 ,description:"task three"},{id:4 ,description:"taks four"},{id:5,description:"taks five"}, {id:6 ,description:"taks six"}, {id:7 ,description:"taks seven"},{id:8 ,description:"taks eight"}]
const kanbanContext = createContext();
//this funtio is for keep the data in the stonrange into the browser
export const KanbanProvider = ({ children }) => {
    const [columns, setColumns] = useState(columnsData);

    return(
        <kanbanContext.Provider value={{columns, setColumns}}>
            {children}
        </kanbanContext.Provider>
    )

}

export const useKanban = () => useContext(kanbanContext) 