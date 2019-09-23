import React, { useEffect, useState } from 'react'
import { ContentViewProps } from '../../ContentView/ContentView';
import { ContentData } from '../../_data/Data';

export type SideBarProps = {
    contentData: ContentData,
    pageTitle: string,
    activeSection: string,
    activeSectionIndex: number
}

export const SideBar: React.FC<SideBarProps> = ({
    contentData,
    pageTitle, 
    activeSection,
    activeSectionIndex
}) => {

    if (!contentData && !pageTitle) {
        return <></>;
    } else if (!contentData[pageTitle].hasSidebar) {
        return <></>;
    }

    const onClick = (event: React.MouseEvent) => {
        let location = document.getElementById(event.currentTarget.id.split("-")[0])!!.getBoundingClientRect().top - 100;
        window.scrollTo({ top: location, behavior: 'smooth' });
    }
console.log(activeSectionIndex)
    let progressStyle = {
        height: activeSectionIndex + "%"
    };
    return <div id="sidebar-container">
        <ul id="sidebar">
            {contentData[pageTitle].content && contentData[pageTitle].content ? 
                contentData[pageTitle].contentOrder!!.map((content, index) => {
                    if (contentData[pageTitle].content!![content]!!.type == "HEADER") {
                        return <li id={content + "-link"} key={content} onClick={(event) => {window.scroll({top: document.getElementById(content)!!.getBoundingClientRect().top - 100, behavior: 'smooth'})}} 
                        className={content == activeSection ? "active-section" : "nonactive-section"}>
                        {contentData[pageTitle].content!![content]!!.header_content}
                    </li>;
                    } else {
                        return null;
                    }
                })
                : null}
        </ul>
        <div id="sidebar-progress"><span style={progressStyle}>&nbsp;</span></div>
    </div>;

}