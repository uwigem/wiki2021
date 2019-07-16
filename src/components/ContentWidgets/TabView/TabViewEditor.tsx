import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { WidgetEditorProps } from '../../ContentMapping/ContentMapping';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { Tab } from './TabView';

export const TabViewEditor: React.FC<WidgetEditorProps> = ({
    originalContent,
    editedContent,
    setEditedContentOnChange
}) => {

    const [currentTab, setcurrentTab] = useState(0);
    const [renderView, setRenderView] = useState(false);

    let copyTabViewContent: Tab[] = [];
    if (editedContent.tabView_content) {
        copyTabViewContent = [...editedContent.tabView_content!!];
    }

    let saveContent = (event: React.FormEvent<HTMLTextAreaElement>) => {
        copyTabViewContent[currentTab].tabContent = event.currentTarget.value;
        setEditedContentOnChange("tabView_content", copyTabViewContent);
    }

    let addNewTab = () => {
        let newTab = { tabLabel: "Tab" + (copyTabViewContent.length + 1),
                       tabContent: ""};
        copyTabViewContent.push(newTab);
        setEditedContentOnChange("tabView_content", copyTabViewContent);
    }

    let changeView = (event: React.MouseEvent<HTMLButtonElement>) => {
        if (renderView) {
            event.currentTarget.innerText = "View Content Unrendered";
            setRenderView(false);
        } else {
            event.currentTarget.innerText = "View Content Rendered";
            setRenderView(true);
        }
    }

    let inputTabs = copyTabViewContent.map((tab, index) => {

        let onTabNameChange = (event: React.FormEvent<HTMLInputElement>) => {
            copyTabViewContent[index].tabLabel = event.currentTarget.value;
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

        let showContent = () => {
            setcurrentTab(index);
            currentTabContent = <textarea onChange={saveContent} value={copyTabViewContent[index].tabContent} />
        }

        return <li>
            <button className="tab-control-btn" onClick={showContent}>Content</button>
            <input className="tab-label-input" type="text" value={tab.tabLabel} onChange={onTabNameChange}/>
            <button className="tab-control-btn" 
                    onClick={() => moveTab(0, index - 1)}>←</button>
            <button className="tab-control-btn"
                    onClick={() => moveTab(copyTabViewContent.length - 1, index + 1)}>→</button>
            <button className="remove-tab-btn" onClick={removeTab}>X</button>
        </li>
    });

    let currentTabContent = null;
    let tabViewClass = "current-tab-content-editor";
    if (copyTabViewContent.length > 0) {
        currentTabContent = <textarea onChange={saveContent} value={copyTabViewContent[currentTab].tabContent} />;
        if (renderView) {
            tabViewClass = "current-tab-content";
            currentTabContent = <ReactMarkdown source={copyTabViewContent[currentTab].tabContent} />;
        } else {
            tabViewClass = "current-tab-content-editor";
            currentTabContent = <textarea onChange={saveContent} value={copyTabViewContent[currentTab].tabContent} />;
        }
    }

    return <>
        <ul className="tabs-container">
            {inputTabs}
            <button className="add-tab-btn" onClick={addNewTab}>Add Tab</button>
        </ul>
        <div className={tabViewClass}>
            {currentTabContent}
        </div>
        <button className="tab-content-render-btn" onClick={changeView}>View Content Rendered</button>
    </>

}