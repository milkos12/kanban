import React, { act, createContext, useContext, useReducer, useState } from 'react';



//[{id:1 ,description:"taks one"}, {id:2 ,description:"task two"}, {id:3 ,description:"task three"},{id:4 ,description:"taks four"},{id:5,description:"taks five"}, {id:6 ,description:"taks six"}, {id:7 ,description:"taks seven"},{id:8 ,description:"taks eight"}]
const kanbanContext = createContext();
//this funtio is for keep the data in the stonrange into the browser
export const KanbanProvider = ({ children }) => {
    const [columns, setColumns] = useState([
        { id: "1a", title: "to do", ids: [1, 2, 3], items: [{ id: 11, description: "taks one" }, { id: 22, description: "task two" }, { id: 33, description: "task three" }] },
        { id: "2b", title: "in process", ids: [4], items: [{ id: 4, description: "taks four" }] },
        { id: "3c", title: "done", ids: [5, 6, 7, 8], items: [{ id: 5, description: "taks five" }, { id: 6, description: "taks six" }, { id: 7, description: "taks seven" }, { id: 8, description: "taks eight" }] },
    ]);

    //useReduce 

    const [renderToStaticMarkup, dispatch] = useReducer((state = [], action) => {
        switch (action.type) {

            case 'delete-element': {

                //delete element 

                let updateColumns = columns.map(column => {

                    //create a copy of column but withoud memory reference
                    //this fucntion copy the colum without mery referece
                    //for can update to new state the columns withoud the item deleted
                    let copyColumn = Object.assign({}, column)
                    
                    let copyImtmes = copyColumn.items.map(item =>
                        Object.assign({}, item)
                    )

                    //here is where delete the item use the filter 
                    //for filter the current items without the item for eliminate
                    if (column.id == action.columId) {

                        copyImtmes = copyImtmes.filter(item =>
                            item.id != action.idItem
                        )

                        //assignation new items filter
                        copyColumn.items = copyImtmes
                    }
                    
                    return copyColumn
                })
                

                setColumns(updateColumns)

            }
            default: {
                return state
            }
        }

    });

    return (
        <kanbanContext.Provider value={{ columns, setColumns, dispatch }}>
            {children}
        </kanbanContext.Provider>
    )

}

export const useKanban = () => useContext(kanbanContext) 