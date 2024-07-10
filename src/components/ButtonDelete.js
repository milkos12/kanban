
import { type } from "@testing-library/user-event/dist/type";
import React from "react";
import { useKanban } from '../context/KanbanContext';

export const ButtonDelete = ({idItem, columId}) => {
    const { dispatch } = useKanban()
    const handleSubmit = (event) => {
        event.preventDefault();
    }   
    
    return (<div onSubmit={handleSubmit}>
        <button onClick={()=> dispatch({type:"delete-element", columId, idItem})} type="button">Delete</button>
    </div>)
}

export default ButtonDelete