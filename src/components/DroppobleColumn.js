import { useDroppable } from "@dnd-kit/core"
import "./Board.css"


export const PutDroppoble = ({id, index, children, column, idOrigin}) => {
    const {setNodeRef} = useDroppable({
        id: id,
        data: {
          index: index,
          type: `column`,
          idOrigin
        },
      })
    return (
        <div ref={setNodeRef} column={column} className="purtDroppable">
            {children}
        </div>
    )
} 

export default PutDroppoble