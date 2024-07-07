import React from "react";
import { useSortable, SortableContext } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import "./Board.css";

export const Column = ({ item, columId }) => {
    
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging
    } = useSortable({ id: item.id, data:{type:"item", dataItem:item, columId: columId} });
    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    //show elemen dragg direfferent
    if(isDragging) {
        return(<div >
            {
                <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
                    <h2>grad elemnt</h2>
                    <div>
                        <p>grad elemnt</p>
                    </div>
                </div>

            }
        </div>)
    }

    return (
        <div >
            {
                <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
                    <h2>{item.description}</h2>
                    <div >
                        <p>content </p>
                    </div>
                </div>

            }
        </div>


    );
}

export default Column;