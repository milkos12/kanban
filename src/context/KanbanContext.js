import React, {createContext, useContext, useEffect, useState} from 'react';


const columns = [
    {id:1,title:"to do"},
    {id:2,title:"in process"},
    {id:3,title:"done"},
]

const kanbanContext = createContext();
//this funtio is for keep the data in the stonrange into the browser
export const KanbanProvider = ({ children }) => {
    //const [columns, setColumns] = useState(["to do", "in process", "done"])


    return(
        <kanbanContext.Provider value={{columns}}>
            {children}
        </kanbanContext.Provider>
    )

}

export const useKanban = () => useContext(kanbanContext) 