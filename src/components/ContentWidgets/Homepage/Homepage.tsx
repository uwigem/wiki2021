import React from 'react';
import { ContentSingularData } from "../../_data/ContentSingularData";

export type HomepageItem = {
    title: string,
    subtitle: string,
    backgroundImage: string,
    blur: string,
    bgLightness: string,
    bgOpacity: string
}

/** 
 * A widget for the Home page
 * 
 * Last Modified
 * Allison Lee
 * July 19, 2019
**/
export const Homepage: React.FC<ContentSingularData> = ({
    homepage_content
}) => {
    if (!homepage_content) {
        return <></>
    }

    return (
        <>
            <div style={{
                backgroundImage: `url(${homepage_content.backgroundImage})`,
                height: `100vh`,
                backgroundPosition: `center`,
                backgroundRepeat: `no-repeat`,
                backgroundSize: `cover`,
                backgroundColor: `hsla(0, 0% ,${homepage_content.bgLightness}%, ${homepage_content.bgOpacity})`,
                filter: `blur(${homepage_content.blur}px)`,
            }}>
            </div>
            <div style={{textAlign: `center`, transform: `translate(0, -400%)`}}>
                <h1>{homepage_content.title}</h1>
                <h2>{homepage_content.subtitle}</h2>
            </div>
        </>
    )
}