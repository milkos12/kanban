import React from "react";
import { useSortable } from "@dnd-kit/sortable"; 
import { CSS } from "@dnd-kit/utilities";

export const Column = ({ column }) => {
    
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
      } = useSortable({id: column.id});
      const style = {
        transform: CSS.Transform.toString(transform),
        transition,
      };

      console.log("######")
    
    return (

        <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
            <h2>{column.title}</h2>
            <div >
                <p>content columns</p>
            </div>
        </div>

    );
}

export default Column;