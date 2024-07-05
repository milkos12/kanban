import React, {createContext, useContext, useEffect, useState} from 'react';


const columns = [
    {title:"to do"},
    {title:"in process"},
    {title:"done"},
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