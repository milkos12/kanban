import React from "react";
import { useSortable } from "@dnd-kit/sortable"; 
import { CSS } from "@dnd-kit/utilities";

export const Column = ({ item }) => {
    
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
      } = useSortable({id: item.id});
      const style = {
        transform: CSS.Transform.toString(transform),
        transition,
      };

    return (

        <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
            <h2>{item.description}</h2>
            <div >
                <p>content </p>
            </div>
        </div>

    );
}

export default Column;