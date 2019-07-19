import React from 'react';
import { ContentSingularData } from "../../_data/ContentSingularData";

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
            <div className="bg-image-container">
                <img className="bg-image" src={homepage_content.backgroundImage}/>
                <section className="centered">
                    <h1>{homepage_content.title}</h1>
                    <h2>{homepage_content.subtitle}</h2>
                </section>
            </div>
        </>
    )
}