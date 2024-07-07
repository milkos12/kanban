import { useDroppable } from "@dnd-kit/core"


export const PutDroppoble = ({id, index, children, column}) => {
    const {setNodeRef} = useDroppable({
        id: id,
        data: {
          index: index,
          type: 'empty'
        },
      })
    return (
        <div ref={setNodeRef} column={column}>
            {children}
        </div>
    )
} 

export default PutDroppoble