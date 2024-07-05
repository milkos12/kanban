import React from 'react';
import { useKanban } from '../context/KanbanContext';
import { Column } from './Column'

export const Board = () => {
    
    const {columns} = useKanban();
    
    
    return (
        <div>
            {
                columns.map(column =>
                    <Column column={column}/>
                )
            }
        </div>
    )
}

export default Board;


