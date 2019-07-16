import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { ContentSingularData } from '../../_data/ContentSingularData';
import './TabView.css';

export type Tab = {
    tabLabel: string
    tabContent: string
} 

export const TabView: React.FC<ContentSingularData> = ({
    tabView_content
}) => {
    
    const [currentTab, setcurrentTab] = useState(0);

    if (!tabView_content) {
        return <></>
    }
    
    let tabs = tabView_content!!.map((tab, index) => {
        let tabClassName = "tab";
        if (index == currentTab) {
            tabClassName += " current-tab";
        }
        return <li className={tabClassName} onClick={() => setcurrentTab(index)}>{tab.tabLabel}</li>
    });

    return <div>
        <ul className="tabs-container">
            {tabs}
        </ul>
        <div className="current-tab-content">
            <ReactMarkdown source={tabView_content[currentTab].tabContent} />
        </div>
    </div>;
}