import React, { FormEvent, ChangeEvent } from 'react';
import { WidgetEditorProps } from '../../ContentMapping/ContentMapping';
import './Homepage.css';

export const HomepageEditor: React.FC<WidgetEditorProps> = ({
    originalContent, 
    editedContent,
    setEditedContentOnChange
}) => {
    let homepage_content = editedContent.homepage_content || 
        {title: "Title not set", subtitle: "Subtitle not set", backgroundImage: "", blur: "", bgLightness: "", bgOpacity: ""};

    const updateTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        homepage_content.title = e.target.value;
        setEditedContentOnChange("homepage_content", homepage_content);
    }

    const updateSubtitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        homepage_content.subtitle = e.target.value;
        setEditedContentOnChange("homepage_content", homepage_content);
    }

    const updateBackgroundImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        homepage_content.backgroundImage = e.target.value;
        setEditedContentOnChange("homepage_content", homepage_content);
    }

    const updateBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
        homepage_content.blur = e.target.value;
        setEditedContentOnChange("homepage_content", homepage_content);
    }

    const updateBgLightness = (e: React.ChangeEvent<HTMLInputElement>) => {
        homepage_content.bgLightness = e.target.value;
        setEditedContentOnChange("homepage_content", homepage_content);
    }

    const updateBgOpacity = (e: React.ChangeEvent<HTMLInputElement>) => {
        homepage_content.bgOpacity = e.target.value;
        setEditedContentOnChange("homepage_content", homepage_content);
    }
    
    return <>
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
        <div>
            <h3>Title</h3>
            <input type="text" onChange={(e) => updateTitle(e)} />
            <h3>Subtitle</h3>
            <input type="text" onChange={(e) => updateSubtitle(e)} />
            <h3>Background Image</h3>
            <input type="text" onChange={(e) => updateBackgroundImage(e)} />
            <h3>Blur</h3>
            <input type="number" onChange={(e) => updateBlur(e)} />
            <h3>Background Lightness</h3>
            <input type="number" onChange={(e) => updateBgLightness(e)} />
            <h3>Background Opacity</h3>
            <input type="number" onChange={(e) => updateBgOpacity(e)} />
        </div>
    </>
}