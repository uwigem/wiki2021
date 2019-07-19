import React from 'react';
import { ContentSingularData } from "../../_data/ContentSingularData";

/*
    Examples of Parameters
    let p = this.props.params;
    let bgLightness = p.BACKGROUNDLIGHTNESS ? p.BACKGROUNDLIGHTNESS : 0;
    let bg = p.BACKGROUND ? p.BACKGROUND : this.defaultImage;
    let bgOpacity = p.BACKGROUNDOPACITY ? p.BACKGROUNDOPACITY : 0.60;
    let titleHeight = p.TITLEHEIGHT ? p.TITLEHEIGHT : 12;
    let subtitleHeight = p.SUBTITLEHEIGHT ? p.SUBTITLEHEIGHT : 7;
    let title = p.TITLE ? p.TITLE : "Stronger Together";
    let subtitle = p.SUBTITLE ? p.SUBTITLE : "";
    let buttonText = p.BUTTONTEXT ? p.BUTTONTEXT : 'Overview';
    let contentTitle = p.CONTENTTITLE ? p.CONTENTTITLE : 'Washington iGEM 2018 Project';
    let contentSubtitle = p.CONTENTSUBTITLE ? p.CONTENTSUBTITLE : 'Chemically Induced Dimerization of Nanobodies for the Development of Versatile Biosensors';
    let content = p.CONTENT ? p.CONTENT.split(';') : [''];
    let blur = p.BLUR ? p.BLUR : 5;
    */

export type HomepageItem = {
    title: string,
    subtitle: string,
    backgroundImage: string
}

/** 
 * A widget for the Home page
 * 
 * Last Modified
 * Allison Lee
 * July 17, 2019
**/
export const Homepage: React.FC<ContentSingularData> = ({
    homepage_content
}) => {
    if (!homepage_content) {
        return <></>
    }

    return (
        <>
        {/* <div style={{ width: "100%", height: "100%", backgroundImage: homepage_content.backgroundImage }}>
            <h1>{homepage_content.title}</h1>
            <h2>{homepage_content.subtitle}</h2>
        </div> */}
        </>
    )
}