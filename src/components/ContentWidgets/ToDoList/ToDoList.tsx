import React from 'react';
import { ContentSingularData } from "../../_data/ContentSingularData";

export type ToDoListItem = {
    toDoListItem_hash: string
    toDoListItem_task: string
}

/** 
 * A to-do list widget
 * 
 * Last Modified
 * Allison Lee
 * July 11, 2019
**/
export const ToDoList: React.FC<ContentSingularData> = ({
    toDoList_content
}) => {
    if (!toDoList_content) {
        return <></>
    }

    return (
        <ul>
            {toDoList_content.map((item) => {
                return (
                    <li key={item.toDoListItem_hash}>
                        {item.toDoListItem_task}
                    </li>
                )
            })}
        </ul>
    )
}