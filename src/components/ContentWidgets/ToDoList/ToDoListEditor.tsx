import React, { FormEvent, ChangeEvent } from 'react';
import { WidgetEditorProps } from '../../ContentMapping/ContentMapping';
import './ToDoList.css';

export const ToDoListEditor: React.FC<WidgetEditorProps> = ({
    originalContent, 
    editedContent,
    setEditedContentOnChange
}) => {
    let list = editedContent.toDoList || [];
    let title = "";

    let handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.value);
        title = e.target.value;
    }

    let addToDo = (e: FormEvent) => {
        e.preventDefault()
        let newList = [...list];
        newList.push(title);
        setEditedContentOnChange("toDoList", newList);
    }

    let items = list.map((item) => {
        return <li>{item}</li>;
    })

    return <>
        <ul>
            {items}
        </ul>
        <h3>Add New To-Do Item</h3>
        <form onSubmit={(e) => addToDo(e)}>
            <input type="text" placeholder="Task" onChange={(e) => handleChange(e)}/>
            <button type="submit"> Add Task </button>
        </form>
    </>
}