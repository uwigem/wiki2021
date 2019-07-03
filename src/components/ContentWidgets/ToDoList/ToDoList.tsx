import React from 'react';
import { ContentSingularData } from '../../_data/ContentSingularData';
import './ToDoList.css';

export type ToDoListItem = {
    toDoListItem_content: string
    toDoListItem_completed: boolean
    toDoListItem_order: number
}

export const ToDoList: React.FC<ContentSingularData> = ({
    toDoList_content
}) => {
    if (!toDoList_content) {
        return <></>
    }

    let toDoListItems = toDoList_content.map(item => {
        let completed = "";
        if (item.toDoListItem_completed) { 
            completed = "completedListItem";
        };
        return (<li className={completed}>{item.toDoListItem_content}</li>)
    });

    return <ul>{toDoListItems}</ul>;
}

