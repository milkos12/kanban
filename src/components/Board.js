import React from 'react';
import { useKanban } from '../context/KanbanContext';
import { Column } from './Column'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

export const Board = () => {

    const { columns } = useKanban();

    let conunt = 0;
    return (
        <DragDropContext>
            <Droppable>
                {(provide) => (
                    <div  ref={provide.innerRef} {...provide.droppableProps}>
                        {
                            columns.map(column => {
                                conunt+=1;
                                return (

                                    <Draggable>
                                        <Column column={column} key={conunt}/>
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


