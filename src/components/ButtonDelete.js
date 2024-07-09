
import { type } from "@testing-library/user-event/dist/type";
import React from "react";

export const ButtonDelete = ({idItem, columId, dispatch}) => {

    const handleSubmit = (event) => {
        event.preventDefault();
    }   
    
    return (<div onSubmit={handleSubmit}>
        <button onClick={()=> dispatch({type:"delete-element", columId, idItem})} type="button">Delete</button>
    </div>)
}

export default ButtonDelete