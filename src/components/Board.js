import React from 'react';
import { useKanban } from '../context/KanbanContext';
import { Column } from './Column'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

export const Board = () => {

    const { columns } = useKanban();

    let conunt = 0;
    return (
        <DragDropContext>
            <Droppable droppableId='columns'>
                {(provide) => (
                    <div  ref={provide.innerRef} {...provide.droppableProps}>
                        {
                            columns.map(column => {
                                conunt+=1;
                                return (

                                    <Draggable draggableId={`Draggale-id-${conunt}`} index={conunt}>
                                        {(provider) =>(
                                        <Column column={column} key={conunt} ref={provider.innerRef} {...provider.dragHandleProps} {...provider.draggableProps}/>
                            )}
                                    </Draggable>

                                )
                            }

                            )
                        }
                        {provide.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>

    )
}

export default Board;


