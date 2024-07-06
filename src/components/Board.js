import React, {useState} from 'react';
import { useKanban } from '../context/KanbanContext';
import { Column } from './Column'
import { DndContext, closestCorners , useSensors, useSensor, KeyboardSensor, closestCenter} from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { PointerSensor } from '@dnd-kit/core';
import './Board.css'


export const Board = () => {

    const { columns } = useKanban();
    const [items, setItems] = useState([1, 2, 3]);
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
          coordinateGetter: sortableKeyboardCoordinates,
        })
      );
    
      //sort the 
      function handleDragEnd(event) {
 
      }


    return (
        <div>
            <DndContext collisionDetection={closestCenter} sensors={sensors} onDragEnd={handleDragEnd}>
               {
                columns.map(column =>
                    <SortableContext items={column.items} strategy={verticalListSortingStrategy} className="boardCss">
                        {
                            column.items.map((item, index) =>
                                <Column item={item} key={column.id} id={index}/>

                            )
                        }
                    </SortableContext>
                )
               }
                    
               
            </DndContext>
        </div>
    )
}
export default Board;


