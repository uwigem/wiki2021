import React from 'react';
import { WidgetEditorProps } from '../../ContentMapping/ContentMapping';

export const ToDoListEditor: React.FC<WidgetEditorProps> = ({
    originalContent, 
    editedContent,
    setEditedContentOnChange
}) => {
    let list = editedContent.list || [];

    let items = list.map((item) => {
        return <li>{item}</li>;
    })

    return <>
        <ul>
            items
        </ul>
        <h3>Add New To-Do Item</h3>
        <input type="text" onChange={(e) => setEditedContentOnChange("list", e.target.value)}/>
    </>
}