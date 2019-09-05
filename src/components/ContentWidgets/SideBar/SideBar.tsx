import React, { useEffect, useState } from 'react'
import { ContentViewProps } from '../../ContentView/ContentView';

export const SideBar: React.FC<ContentViewProps> = ({
    contentData,
    pageTitle
}) => {
    const topOffSet = 100;
    const [currentSection, setCurrentSection] = useState(contentData[pageTitle].contentOrder ? contentData[pageTitle].contentOrder!![0] : "");
    
    useEffect(() => {
        const positions = contentData[pageTitle].contentOrder!!.map ((id) => {return document.getElementById(id)!!.getBoundingClientRect().top});
        console.log(positions);

        const listener = (event: Event) => {
            let min = 9999999;
            let active = 0;
            positions.forEach((position, index) => {
                
                if (position - window.scrollY < min) {
                    min = position;
                    active = index;
                }
            });
            if (currentSection != contentData[pageTitle].contentOrder!![active]) {
                setCurrentSection(contentData[pageTitle].contentOrder!![active]);
            }
        }

        window.addEventListener('scroll', listener);
        return () => {window.removeEventListener('scroll', listener)};
    });

    if (!contentData && !pageTitle) {
        return <></>;
    } else if (!contentData[pageTitle].hasSidebar) {
        return <></>;
    }

    return <ul id="sidebar">
        {contentData[pageTitle].content && contentData[pageTitle].content ? 
            contentData[pageTitle].contentOrder!!.map((content, index) => {
                return <li key={content} onClick={(event) => { window.scroll({ top: document.getElementById(content)!!.getBoundingClientRect().top - topOffSet, behavior: 'smooth' }) }} 
                    className={content == currentSection ? "active-section" : ""}>
                    {content}
                </li>;
            })
            : null}
    </ul>;

}