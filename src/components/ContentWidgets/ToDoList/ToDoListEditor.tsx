import React from 'react';
import { WidgetEditorProps } from '../../ContentMapping/ContentMapping';
import { ToDoListItem } from './ToDoList';

export const ToDoListEditor: React.FC<WidgetEditorProps> = ({
    originalContent,
    editedContent,
    setEditedContentOnChange
}) => {
    let listContent = null;

    // let findItemIndex = (findItemID: number, copyEditedContent: ToDoListItem[]) => {
        
    //     for (let i = 0; i < copyEditedContent.length; i++) {
    //         if (findItemID == copyEditedContent[i].toDoListItem_order) {
    //             return i;
    //         }
    //     }
    //     return -1;
    // }

    if (editedContent.toDoList_content != null) {
        listContent = editedContent.toDoList_content.map((item) => {
            
            let copyEditedContent = [...editedContent.toDoList_content!!];

            let removeAction = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
                let index = parseInt(e.currentTarget.parentElement!!.id);
                copyEditedContent.splice(index, 1);
                // reassigns ordering
                for (let i = 0; i < copyEditedContent.length; i++) {
                    copyEditedContent[i].toDoListItem_order = i;
                }
                setEditedContentOnChange("toDoList_content", copyEditedContent);
            }

            let changeInput = (e: React.FormEvent<HTMLInputElement>) => {
                let index = parseInt(e.currentTarget.parentElement!!.id);
                // console.log(parseInt(e.currentTarget.parentElement!!.id.charAt(e.currentTarget.parentElement!!.id.length - 1)));
                copyEditedContent[index].toDoListItem_content = e.currentTarget.value;
                setEditedContentOnChange("toDoList_content", copyEditedContent);
            }

            let changeCompleted = (e: React.FormEvent<HTMLInputElement>) => {
                let index = parseInt(e.currentTarget.parentElement!!.id);
                copyEditedContent[index].toDoListItem_completed = e.currentTarget.checked;
                setEditedContentOnChange("toDoList_content", copyEditedContent);
            }

            return <div key={item.toDoListItem_order} id={"" + item.toDoListItem_order}>
                {/* <li className={completed}>{item.toDoListItem_content}</li> */}
                <input type="checkbox" onChange={changeCompleted} checked={item.toDoListItem_completed} />
                <input type="text" onChange={changeInput} value={item.toDoListItem_content} />
                <button onClick={removeAction}>Remove</button>
            </div>;
        });
    }

    let addListItem = () => {
        let copyEditedContent = [...editedContent.toDoList_content!!];
        if (copyEditedContent == null) {
            copyEditedContent = [];
        }
        let newItem = { toDoListItem_content: "",
            toDoListItem_completed: false,
            toDoListItem_order: (copyEditedContent.length) };
        
        copyEditedContent.push(newItem);
        setEditedContentOnChange("toDoList_content", copyEditedContent);
    }

    return <>
        <ol className="toDoList">{listContent}</ol>
        <button onClick={addListItem}>Add</button>
    </>

}