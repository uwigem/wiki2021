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

            // Stores header IDs into section array
            contentData[pageString].contentOrder!!.forEach(content => {
                if (contentData[pageString].content!![content]!!.type == "HEADER") {
                    sections.push(content);
                }
            })

            setActiveSection({section: sections[0], index: 0, numSections: sections.length});

            let prevscroll = 0;
            const observerCallback = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
                let entry = entries[entries.length - 1];
                let sectionID = entry.target.id.split("-")[0]
                let sectionIndex = sections.indexOf(sectionID);
                if (entry.boundingClientRect.top <= 0) {
                    if (window.scrollY > prevscroll) {
                        setActiveSection({section: sectionID, 
                                          index: sectionIndex, 
                                          numSections: sections.length});
                    } else {
                        let index = sectionIndex - 1 < 0 ? sectionIndex : sectionIndex - 1
                        setActiveSection({section: sections[index], 
                                          index: index, 
                                          numSections: sections.length});
                    }
                }
                prevscroll = window.scrollY;
            }

            const options = {
                root: document.querySelector('#app-content-dev'),
                rootMargin: '0px',
                threshold: [0.0, 1.0]
            };

            // Sets up observer for each header
            const observer = new IntersectionObserver(observerCallback, options);
            sections.forEach((content) => {
                let target = document.getElementById(content);
                observer.observe(target!!);
            });
            document.querySelectorAll(".section-enders").forEach((content) => {
                observer.observe(content);
            });
        }
    }, [contentData]);

    let pageString = pageTitle === "" ? "MAIN_PAGE_DO_NOT_EDIT" :
        pageTitle.substring(1, pageTitle.length);

    if (!contentData || !contentData[pageString]) {
        return <></>
    }

    return <>
        <div className={contentData[pageString].hasSidebar ? "sidebar-content-view" : ""}>
            {
            contentData[pageString].hasSidebar ? 
                <SideBar contentData={contentData} pageTitle={pageString} activeSection={activeSection.section}
                activeSectionIndex={Math.round((activeSection.index + 1) / activeSection.numSections * 100.0)} /> : null
            }
            
            <div id="content-view-container">
                {contentData[pageString].contentOrder &&
                    contentData[pageString].content &&
                    contentData[pageString].contentOrder!.map((contentHash, index) => {
                        let content = contentData[pageString].content![contentHash];
                        let ContentWidget = ContentMapping[content!.type].widget;

                        let nextContentHash = contentData[pageString].contentOrder![index + 1] || 
                            contentData[pageString].contentOrder![index]
                        let nextContentType = contentData[pageString].content![nextContentHash]!.type

                        return <div id={contentHash} key={contentHash}>
                            <ContentWidget {...content} />
                            {nextContentType == "HEADER" ? 
                                <div id={nextContentHash + "-begin"} className="section-enders" style={{height: "5px", width: "100%", marginBottom: "4rem"}}>&nbsp;</div> : null}
                        </div>
                    })
                }
            </div>
        </div>
    </>
}