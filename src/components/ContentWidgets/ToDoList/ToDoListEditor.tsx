import React, { FormEvent, ChangeEvent } from 'react';
import { WidgetEditorProps } from '../../ContentMapping/ContentMapping';
import './ToDoList.css';

export const ToDoListEditor: React.FC<WidgetEditorProps> = ({
    originalContent, 
    editedContent,
    setEditedContentOnChange
}) => {
    let list = editedContent.toDoList || [];
    let task_text = "";

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        task_text = e.target.value;
    }

    const addToDo = (e: FormEvent) => {
        e.preventDefault();
        let newList = [...list];
        newList.push({index: newList.length, task: task_text});
        setEditedContentOnChange("toDoList", newList);
    }

    const removeToDo = (indexToRemove: number) => {
        let newList = [...list];
        newList.splice(indexToRemove, 1);
        for (let i = indexToRemove; i < newList.length; i++) {
            newList[i].index = i;
        }
        setEditedContentOnChange("toDoList", newList);
    }

    let items = list.map((item) => {
        return (
            <li key={item.index}>{item.task}
                <button onClick={() => removeToDo(item.index!)}>&times;</button>
            </li>
        );
    })
    
    return <>
        <ul>
            {items}
        </ul>
        <h3>Add New To-Do Item</h3>
        {console.log(task_text)}
        <form onSubmit={(e) => addToDo(e)}>
            <input type="text" placeholder="Type task to do..." onChange={(e) => handleChange(e)}/>
            <button type="submit">Add Task</button>
        </form>
    </>
}