import React, {useState} from 'react';
import { useKanban } from '../context/KanbanContext';
import { Column } from './Column'
import { DndContext, closestCorners , useSensors, useSensor, KeyboardSensor, closestCenter} from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { PointerSensor } from '@dnd-kit/core';


export const Board = () => {

    const { columns } = useKanban();
    const [items, setItems] = useState([1, 2, 3]);
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
          coordinateGetter: sortableKeyboardCoordinates,
        })
      );
    
      function handleDragEnd(event) {
        /*const {active, over} = event;
        
        if (active.id !== over.id) {
          setItems((items) => {
            const oldIndex = items.indexOf(active.id);
            const newIndex = items.indexOf(over.id);
            
            return arrayMove(items, oldIndex, newIndex);
          });
        }*/
      }

      console.log(columns)

    return (
        <div>
            <DndContext collisionDetection={closestCenter} sensors={sensors} onDragEnd={handleDragEnd}>
               
                    <SortableContext items={items} strategy={verticalListSortingStrategy}>
                        {
                            columns.map((column, index) =>
                                <Column column={column} key={column.id} id={index}/>

                            )
                        }
                    </SortableContext>
               
            </DndContext>
        </div>
    )
}
export default Board;


