import React, { FormEvent, ChangeEvent } from 'react';
import { WidgetEditorProps } from '../../ContentMapping/ContentMapping';
import './ToDoList.css';
import { ToDoListItem } from './ToDoList';

export const ToDoListEditor: React.FC<WidgetEditorProps> = ({
    originalContent, 
    editedContent,
    setEditedContentOnChange
}) => {
    let toDoList_content = editedContent.toDoList_content || [];
    let taskText = "";
    
    const generateHash: () => string = () => {
        const lengthOfGeneratedHash = 24;
    
        let randomInt8s = new Uint8Array(lengthOfGeneratedHash / 2);
        window.crypto.getRandomValues(randomInt8s);
        return randomInt8s.reduce((accumulator, randomInt) => {
            return accumulator + ('0' + randomInt.toString(16)).substr(2)
        }, "")
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        taskText = e.target.value;
    }

    const addToDo = (e: FormEvent) => {
        e.preventDefault();
        let listCopy = [...toDoList_content];
        let newKey = generateHash();
        listCopy.push({toDoListItem_hash: newKey, toDoListItem_task: taskText});
        setEditedContentOnChange("toDoList_content", listCopy);
    }

    const removeToDo = (hashToRemove: string) => {
        let listCopy = [...toDoList_content];
        let newList: ToDoListItem[] = [];

        listCopy.forEach(item => {
            if (item.toDoListItem_hash !== hashToRemove) {
                newList.push(item)
            }
        });
        setEditedContentOnChange("toDoList_content", newList);
    }
    
    return <>
        <ul>
            {
                toDoList_content.map((item) => {
                    return (
                        <li key={item.toDoListItem_hash}>{item.toDoListItem_task}
                            <button onClick={() => removeToDo(item.toDoListItem_hash)}>&times;</button>
                        </li>
                    );
                })
            }
        </ul>
        <h3>Add New To-Do Item</h3>
        <form onSubmit={(e) => addToDo(e)}>
            <input type="text" placeholder="Type task to do..." onChange={(e) => handleChange(e)}/>
            <button type="submit">Add Task</button>
        </form>
    </>
}