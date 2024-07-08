import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { useDraggable } from "@dnd-kit/core";
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
    } = useSortable({ id: item.id, data: { type: "item", dataItem: item, columId: columId } });
    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    function Draggable () {
        const {attributes, listeners, setNodeRef, transform} = useDraggable({
            id: `drag-${item.id}`,
          });
        
        return [attributes, listeners, setNodeRef, transform]
    }

    const [attributesD, listenersD, setNodeRefD, transformD] = Draggable();
    const styleD = {
        transform: CSS.Transform.toString(transformD),
    };

    //show elemen dragg direfferent
    /*if(isDragging) {
        return(<div >
            {
                <div ref={setNodeRef} style={style} {...attributes} {...listeners} className="itemHight">
                    <h2>grad elemnt</h2>
                    <div>
                        <p>grad elemnt</p>
                    </div>
                </div>

            }
        </div>)
    }*/

    return (
        <div>
            {
                <div ref={setNodeRefD} style={styleD} {...attributesD} {...listenersD} className="rounded-1xl bg-white text-sm leading-6 shadow-lg ring-1 ring-gray-900/5">
                <div ref={setNodeRef} style={style} {...attributes} {...listeners} className="rounded-3xl bg-white text-sm leading-6 shadow-lg ring-1 ring-gray-900/5">
                    
                        <h2>{item.description}</h2>
                        <div >
                            <p>content </p>
                        </div>
                    </div>

                </div>

            }
        </div>


    );
}

export default Column;