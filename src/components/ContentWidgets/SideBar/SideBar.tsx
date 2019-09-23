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
    const [currentSection, setCurrentSection] = useState(contentData[pageTitle].contentOrder ? contentData[pageTitle].contentOrder!![0] : "");
    const topOffSet = 200;
    // useEffect(() => {
        // const positions = contentData[pageTitle].contentOrder!!.map ((id) => {return document.getElementById(id)!!.getBoundingClientRect().top});

        // const listener = (event: Event) => {
        //     let min = 9999999;
        //     let active = 0;
        //     positions.forEach((position, index) => {
                
        //         if (position - window.scrollY < min) {
        //             min = position;
        //             active = index;
        //         }
        //     });
        //     if (currentSection != contentData[pageTitle].contentOrder!![active]) {
        //         setCurrentSection(contentData[pageTitle].contentOrder!![active]);
        //     }
        // }

        // window.addEventListener('scroll', listener);
        // return () => {window.removeEventListener('scroll', listener)};
    // });

    if (!contentData && !pageTitle) {
        return <></>;
    } else if (!contentData[pageTitle].hasSidebar) {
        return <></>;
    }

    const onClick = (event: React.MouseEvent) => {
        let tar = event.currentTarget.id.split("-");
        console.log(tar[0]);
        console.log(document.getElementById(tar[0]))
        console.log(document.getElementById(tar[0])!!.getBoundingClientRect());
        let location = document.getElementById(tar[0])!!.getBoundingClientRect().top - 100;
        // document.getElementById(tar[0])!!.scrollIntoView({behavior: 'smooth'});
        // window.scrollBy(0, -50);
        // console.log(location);
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