import React from 'react';
import { ContentSingularData } from "../../_data/ContentSingularData";

/** 
 * A to-do list widget
 * 
 * Last Modified
 * Allison Lee
 * June 28, 2019
**/
export const ToDoList: React.FC<ContentSingularData> = ({
    toDoList
}) => {
    if (!toDoList) {
        return <></>
    }

    let items = toDoList.map((item) => {
        return <li>{item}</li>;
    })

    return <ul>{items}</ul>
}