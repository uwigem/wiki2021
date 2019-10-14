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

            const observerCallback = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
                let entry = entries[entries.length - 1];
                let fullID = entry.target.id.split("-");
                let sectionID = fullID[0];
                let sectionIndex = sections.indexOf(sectionID);
                if (entry.boundingClientRect.top <= 0) {
                        setActiveSection({section: sectionID, 
                            index: sectionIndex, 
                            numSections: sections.length});
                }
            }

            const options = {
                root: document.querySelector('#app-content-dev'),
                rootMargin: '5px',
                threshold: [0.0, 0.5, 1.0]
            };

            // Sets up observer for each header
            const observer = new IntersectionObserver(observerCallback, options);
            sections.forEach((content) => {
                let target = document.getElementById(content);
                observer.observe(target!!);
            });
            document.querySelectorAll(".section-dividers").forEach((content) => {
                observer.observe(content);
            });
        }
    }, [contentData]);

	let pageString = pageTitle === "" ? "MAIN_PAGE_DO_NOT_EDIT" :
		pageTitle.substring(1, pageTitle.length);

	if (!contentData || !contentData[pageString]) {
		return <></>
	}

    let prettyDividerStyle = {
        height: "5px",
        width: "50%",
        backgroundColor: "#420DAB",
        borderRadius: "5",
        marginRight: "auto",
        marginLeft: "auto"
    }
    let prevHeader = "";
    return <>
        {/* {contentData[pageString].contentOrder &&
         contentData[pageString].content && 
         contentData[pageString].content![contentData[pageString].contentOrder![0]]!.type == "BANNER" ? 
            (let ContentWidget = ContentMapping[content!.type].widget; <ContentWidget {...content} />) : null} */}
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
                        prevHeader = content!.type == "HEADER" ? contentHash : prevHeader;

                        let sectionDividerBegin = <div id={nextContentHash + "-begin"} className="section-dividers" style={{height: "5px", width: "100%", marginBottom: "4rem"}}>&nbsp;</div>
                        let sectionDividerEnd = <div id={prevHeader + "-end"} className="section-dividers" style={{height: "5px", width: "100%", marginBottom: "4rem"}}>&nbsp;</div>

                        return content!.type == "BANNER" ? null : <div id={contentHash} key={contentHash}>
                            <ContentWidget {...content} />
                            {nextContentType == "HEADER" ? sectionDividerEnd : null}
                            {nextContentType == "HEADER" ? <div style={prettyDividerStyle}>&nbsp;</div> : null}
                            {nextContentType == "HEADER" ? sectionDividerBegin : null}
                        </div>
                    })
                }
            </div>
        </div>
    </>
}