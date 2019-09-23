import React, { useState, useEffect } from 'react';
import { ContentData } from '../_data/Data';
import { ContentMapping } from '../../components/ContentMapping/ContentMapping';
import equal from 'deep-equal';
import './ContentView.css';
import { SideBar } from '../ContentWidgets/SideBar/SideBar';


export type ContentViewProps = {
    contentData: ContentData,
    pageTitle: string
}

/**
 * ContentView shows the content from the data provided. It renders widgets.
 * 
 * Last Modified
 * July 19, 2019
 * William Kwok 
 */
export const ContentView: React.FC<ContentViewProps> = ({ contentData, pageTitle }) => {
    const [content, setContent] = useState<ContentData>({ ...contentData } as ContentData);
    const [activeSection, setActiveSection] = useState({section: "", index: 0, numSections: 0});
    const sections: string[] = [];
    useEffect(() => {
        if (!equal(content, contentData)) {
            setContent({ ...contentData } as ContentData)
        }
        if (contentData && contentData[pageString]) {

            
            contentData[pageString].contentOrder!!.forEach(content => {
                if (contentData[pageString].content!![content]!!.type == "HEADER") {
                    sections.push(content);
                }
            })
            setActiveSection({section: sections[0], index: 0, numSections: sections.length});
            let prevscroll = 0;
            let options = {
                root: document.querySelector('#app-content-dev'),
                rootMargin: '0px',
                threshold: [0.0, 0.5, 1.0]
            };

            let observerCallback = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
                // let entry = entries[0];
                
                // let sectionIndex = sections.indexOf(entry.target.id);
                // if (entry.boundingClientRect.top <= 0) {

                // }
                // if (window.scrollY - prevscroll > 0) {
                //     setActiveSection({section: entry.target.id, index: sectionIndex});
                // } else {
                //     setActiveSection({section: sections[sectionIndex - 1], index: sectionIndex - 1});
                // }

                let entry = entries[0];
                let sectionIndex = sections.indexOf(entry.target.id);
                if (entry.boundingClientRect.top <= 0) {
                    if (window.scrollY > prevscroll) {
                        setActiveSection({section: entry.target.id, index: sectionIndex, numSections: sections.length});
                    } else {
                        setActiveSection({section: sections[sectionIndex - 1], index: sectionIndex - 1, numSections: sections.length});
                    }
                    console.log(prevscroll)
                // } else if (activeSection.index - 1 == sectionIndex - 1) {
                //         sectionIndex = sectionIndex - 1;
                //         let section = sections[sectionIndex];
                //         setActiveSection({section: section, index: sectionIndex});
                //         console.log("trigger")
                }
                
                prevscroll = window.scrollY;

                // let min = 999999;
                // let active = "";
                // sections.forEach(section => {
                //     let location = document.getElementById(section)!!.getBoundingClientRect().top;
                //     if (location - window.scrollY < min) {
                //         active = section;
                //         min = location;
                //     }
                // });
                // setActiveSection(active);
                
            }

            // Sets up observer for each header
            let observer = new IntersectionObserver(observerCallback, options);
            sections.forEach(content => {
                let target = document.getElementById(content);
                observer.observe(target!!);
            });
        }
    }, [contentData]);

    let pageString = pageTitle === "" ? "MAIN_PAGE_DO_NOT_EDIT" :
        pageTitle.substring(1, pageTitle.length);

    if (!contentData || !contentData[pageString]) {
        return <></>
    }
    console.log("something: " + Math.round(activeSection.index / sections.length * 100.0));
    return <>
        <div className={contentData[pageString].hasSidebar ? "sidebar-content-view" : ""}>
            {/** TODO: Add sidebar here if the page is a sidebar. */
            contentData[pageString].hasSidebar ? 
                <SideBar contentData={contentData} pageTitle={pageString} activeSection={activeSection.section}
                activeSectionIndex={Math.round((activeSection.index + 1) / activeSection.numSections * 100.0)} />
            
            : null
            }
            
            <div id="content-view-container">
                {contentData[pageString].contentOrder &&
                    contentData[pageString].content &&
                    contentData[pageString].contentOrder!.map((contentHash) => {
                        let content = contentData[pageString].content![contentHash];
                        let ContentWidget = ContentMapping[content!.type].widget;
                        return <div id={contentHash} key={contentHash}>
                            <ContentWidget {...content} />
                        </div>
                    })
                }
            </div>
        </div>
    </>
}