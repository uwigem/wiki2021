import React, { useEffect, useState } from 'react'
import { ContentViewProps } from '../../ContentView/ContentView';
import { ContentData } from '../../_data/Data';

export type SideBarProps = {
    contentData: ContentData,
    pageTitle: string,
    activeSection: string,
    activeSectionIndex: number
}

const onClickLink = (event: React.MouseEvent) => {
    let id = event.currentTarget.id.split("-")[0];
    document.getElementById(id)!!.scrollIntoView({behavior: "smooth"});
    const yourElement = document.getElementById(event.currentTarget.id.split("-")[0]);
    const yCoordinate = yourElement!!.getBoundingClientRect().top + window.pageYOffset;
    const yOffset = -60; 

    window.scrollTo({
        top: yCoordinate + yOffset,
        behavior: 'smooth'
    });
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

    let generateSectionLinks = contentData[pageTitle].contentOrder!!.map((content) => {
        let widgetInfo = contentData[pageTitle].content![content]
        if (widgetInfo!.type == "HEADER") {
            return <li id={content + "-link"} 
                       key={content} 
                       onClick={onClickLink} 
                       className={content == activeSection ? "active-section" : "nonactive-section"}>
                            {widgetInfo!.header_content}
                   </li>;
        } else {
            return null;
        }
    });

    return <div id="sidebar-container">
        <ul id="sidebar">
            {contentData[pageTitle].content ? generateSectionLinks : null}
        </ul>
        <div id="sidebar-progress"><span style={{height: activeSectionIndex + "%"}}>&nbsp;</span></div>
    </div>;

}