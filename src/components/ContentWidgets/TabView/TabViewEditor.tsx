import React from 'react';
import { WidgetEditorProps } from '../../ContentMapping/ContentMapping';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

export const TabViewEditor: React.FC<WidgetEditorProps> = ({
    originalContent,
    editedContent,
    setEditedContentOnChange
}) => {

    let copyTabViewContent: string[] = [];
    if (editedContent.tabView_content) {
        copyTabViewContent = [...editedContent.tabView_content!!];
    }

    if (!editedContent.tabView_current) {
        editedContent.tabView_current = 0;
    }

    let inputTabs = copyTabViewContent.map((tab, index) => {

        let onTabNameChange = (event: React.FormEvent<HTMLInputElement>) => {
            copyTabViewContent[index] = event.currentTarget.value;
            setEditedContentOnChange("tabView_content", copyTabViewContent);
        }

        let removeTab = () => {
            copyTabViewContent.splice(index, 1);
            setEditedContentOnChange("tabView_content", copyTabViewContent);
        }

        let moveTab = (startEndTab: number, nextIndex: number) => {
            if (index != startEndTab) {
                let saveValue = copyTabViewContent[index];
                copyTabViewContent[index] = copyTabViewContent[nextIndex];
                copyTabViewContent[nextIndex] = saveValue;
                setEditedContentOnChange("tabView_content", copyTabViewContent);
            }
        }

        return <li>
            <input type="text" value={tab} onChange={onTabNameChange}/>
            <button className="tab-order-btn" 
                    onClick={() => moveTab(0, index - 1)}>←</button>
            <button className="tab-order-btn"
                    onClick={() => moveTab(copyTabViewContent.length - 1, index + 1)}>→</button>
            <button className="remove-tab-btn" onClick={removeTab}>X</button>
        </li>
    });

    let addNewTab = () => {
        copyTabViewContent.push("Tab" + (copyTabViewContent.length + 1));
        setEditedContentOnChange("tabView_content", copyTabViewContent);
    }

    return <>
        <ul className="tabs-container">{inputTabs}</ul>
        <button onClick={addNewTab}>Add Tab</button>
    </>

}