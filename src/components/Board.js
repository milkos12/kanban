import React from 'react';
import { useKanban } from '../context/KanbanContext';
import { Column } from './Column'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

export const Board = () => {

    const { columns } = useKanban();
    const handleDragEnd = () => {

    }

    let conunt = 0;
    return (
        <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId='columns'>
                {(provide) => (
                    <div ref={provide.innerRef} {...provide.droppableProps}>
                        {
                            columns.map((column, index) =>{
                               
                               return (<Draggable draggableId={`Draggale-id-${index}`} index={index}>
                                    {(provider) => (
                                        <div key={conunt} ref={provider.innerRef} {...provider.dragHandleProps} {...provider.draggableProps} >
                                            <Column column={column} />
                                        </div>
                                        
                                    )}
                                </Draggable>)
                            }  

                                
                                
                                




                            )}
                        {provide.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext >

    )
}

export default Board;


