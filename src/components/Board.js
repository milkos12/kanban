import React, { useState } from 'react';
import { useKanban } from '../context/KanbanContext';
import { Column } from './Column'
import { PutDroppoble } from './DroppobleColumn'
import { DndContext, DragOverlay, useSensors, useSensor, KeyboardSensor, closestCenter, useDroppable, closestCorners } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, sortableKeyboardCoordinates, arrayMove } from "@dnd-kit/sortable";
import { PointerSensor } from '@dnd-kit/core';
import './Board.css'


export const Board = () => {
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
        console.log("'''''''''''''''''''' -> ", over)
        if (!over) return;





        //search in witch column is the items active
        const searchIndexColumn = (itemId) => {
            return columns.findIndex(column => {

                return column.items.some(item => item.id === itemId)
            });
        };

        //search in witch column is the items active 
        //if the columns is different the variable over
        //contein the objecj with data about column not items
        const searchIndexColumnOVER = (itemId) => {
            return columns.findIndex((column, index) => {

                if (over.data.current.type === "empty" && index == over.data.current.index)
                    return true
                if (column.items)
                    return column.items.some(item => item.id === itemId)
            })
        }



        const activeColumnIndex = searchIndexColumn(active.id);
        const overColumnIndex = searchIndexColumnOVER(over.id);


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
        console.log("------------->", event.active)
        setItemActive(event.active.data)
    }

    const onOver = (event) => {



    }

    const faindADNreplaceOVER = (column) => {

    }

    const [enter, setEnter] = useState(false);
    const [enterColumn, setEnterColumn] = useState(false);

    // This function allows updating the position of the items 
    // when they change position and enables moving items between columns
    const handleDragMove = (event) => {
        const { active, over } = event;

        // Extract information from the event
        // In this case, get the dataItem and columnId
        // This information was added when creating the items
        const originColumnId = active.data.current.columnId;
        const itemToMove = active.data.current.dataItem;
        const destinationColumnId = over.data.current.columnId;

        //in some cases, columns can be empty 
        //this function handles the behavior because the 'over' 
        // element from the event changes
        if (over.data.current.type === "column") {
            const destinationColumnIndex = over.data.current.index;

            //this condition prevents duplicating the items 
            //because this function runs many times
            const isDifferentColumn = over.data.current.idOrigin !== originColumnId;

            if (columns[destinationColumnIndex].items.length === 0 && isDifferentColumn && !enter) {
                //move item to empty destination column
                columns[destinationColumnIndex].items.push(itemToMove);

                //remove item from the origin column
                const originColumnIndex = columns.findIndex(column => column.id === originColumnId);
                const originItems = [...columns[originColumnIndex].items];
                const itemIndex = originItems.indexOf(itemToMove);

                if (itemIndex !== -1) {
                    originItems.splice(itemIndex, 1);
                }

                columns[originColumnIndex].items = originItems;

                //set 'enter' to prevent repeating this process many times
                //only repeat when the column of the origin item changes
                setColumns(columns);
                setEnter(true);
            }

            if (enter) {
                setEnter(false);
            }
        }

        const moveItemToDifferentColumn = (originColumnId, destinationColumnId) => {
            //get the index of the origin column
            const originColumnIndex = columns.findIndex(column => column.id === originColumnId);
            //get the index of the destination column
            const destinationColumnIndex = columns.findIndex(column => column.id === destinationColumnId);

            if (originColumnIndex !== -1 && destinationColumnIndex !== -1) {
                //remove item from the origin column
                const originItems = [...columns[originColumnIndex].items];
                const itemIndex = originItems.indexOf(itemToMove);

                //remove the element from the old column
                if (itemIndex !== -1) {
                    originItems.splice(itemIndex, 1);
                }

                //add item to the destination column
                let destinationItems = [];
                destinationItems = [...columns[destinationColumnIndex].items, itemToMove];

                //update columns state
                const updatedColumns = columns.map((column, index) => {
                    if (index === originColumnIndex) {
                        return { ...column, items: originItems };
                    } else if (index === destinationColumnIndex) {
                        return { ...column, items: destinationItems };
                    }
                    return column;
                });

                setColumns(updatedColumns);
                //when set to true, the item is now in the new column
                setEnter(true);
            }
        };

        //in cases where the destinationColumnId is undefined, this means the item
        //is above an empty column
        if (originColumnId !== destinationColumnId && destinationColumnId !== undefined) {
            if (enter) {
                //set 'enter' to prevent repeating this process many times
                //onnly repeat when the column of the origin item changes
                setEnter(false);
            } else {
                moveItemToDifferentColumn(originColumnId, destinationColumnId);
            }
        }
    };




    return (
        <div >
            <DndContext collisionDetection={closestCenter} sensors={sensors} onDragMove={handleDragMove} onDragStart={onDragStartFuntion} onDragEnd={handleDragEnd} onDragOver={onOver}>
                {

                    <div className="boardCss">



                        {
                            columns.map((column, index) =>
                                <PutDroppoble id={index} key={index} index={index} idOrigin={column.id}>
                                    <h2>nombre</h2>
                                    <SortableContext items={column.items.map(item => item.id)} >

                                        {

                                            column.items.map(item => {

                                                return <Column item={item} key={item.id} id={item.id} columId={column.id} />

                                            })

                                        }


                                    </SortableContext>
                                </PutDroppoble>

                            )
                        }


                    </div>





                }
                <DragOverlay>
                    {itemActive &&
                        <Column item={itemActive.current.dataItem} key={itemActive.current.dataItem.id} id={itemActive.current.dataItem.id} />
                    }
                </DragOverlay>

            </DndContext >

        </div >
    )
}
export default Board;


