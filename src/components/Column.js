import React from "react";

export const Column = ({column}) => {
    return(
        <div>
            <h2>{column.title}</h2>
            <div >
                <p>content columns</p>
            </div>
        </div>
    );
}

export default Column;