import React, { useState } from 'react';
import { useKanban } from '../context/KanbanContext';
import { Column } from './Column'
import { DndContext, DragOverlay, useSensors, useSensor, KeyboardSensor, closestCenter, useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { PointerSensor } from '@dnd-kit/core';
import './Board.css'


export const Board = () => {
    const itmesALL = [{ id: 1, description: "taks one" }, { id: 2, description: "task two" }, { id: 3, description: "task three" }, { id: 4, description: "taks four" }, { id: 5, description: "taks five" }, { id: 6, description: "taks six" }, { id: 7, description: "taks seven" }, { id: 8, description: "taks eight" }]
    const { columns, setColumns } = useKanban();
    const [itemActive, setItemActive] = useState(null);
    const [dataAcitve, setDataActive] = useState(null);
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    

    //this function change the state column from app an put
    //the new postion for the item dragged
    function handleDragEnd(event) {
        const { active, over } = event;
        if (!over) return;
        
        //search in witch column is the items active and over
        const searchIndexColumn = (itemId) => {
            return columns.findIndex(column => column.items.some(item => item.id === itemId));
        };

        const activeColumnIndex = searchIndexColumn(active.id);
        const overColumnIndex = searchIndexColumn(over.id);

        //search index from element into columns 
        const activeItemIndex = columns[activeColumnIndex].items.findIndex(item => item.id === active.id);
        const overItemIndex = columns[overColumnIndex].items.findIndex(item => item.id === over.id);

        const activeItem = columns[activeColumnIndex].items[activeItemIndex];
        const updatedColumns = [...columns];

        // move active element to new postion
        updatedColumns[activeColumnIndex].items.splice(activeItemIndex, 1);
        updatedColumns[overColumnIndex].items.splice(overItemIndex, 0, activeItem);

        // update state columns
        setColumns(updatedColumns);
    }


    const onDragStartFuntion = (event) => {
        
        const typeActive = event.active.data.current.sortable.index = 7;

        if (typeActive == "itme") {
            setItemActive(typeActive);
            setDataActive(event.active.data.columId)
            return;
        }
    }

    const onOver = (event) => {
     

    }



    return (
        <div >
            <DndContext collisionDetection={closestCenter} sensors={sensors} onDragStart={onDragStartFuntion} onDragEnd={handleDragEnd} onDragOver={onOver}>
                {

                    <div className="boardCss">

                        <SortableContext items={itmesALL} strategy={verticalListSortingStrategy}>
                            {
                                columns.map((column, index) =>
                                    <div id={`column-${index}`} key={`column-${index}`}>

                                        {

                                            column.items.map(item => {

                                                return <Column item={item} key={item.id} id={item.id} columId={`column-${index}`} />

                                            })

                                        }


                                    </div>
                                )
                            }
                        </SortableContext>
                    </div>





                }


            </DndContext>
            <DragOverlay>
                {itemActive && (

                    <Column item={dataAcitve} />

                )}
            </DragOverlay>
        </div>
    )
}
export default Board;


