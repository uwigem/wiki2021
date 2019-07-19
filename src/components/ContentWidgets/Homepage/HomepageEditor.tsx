import React, { FormEvent, ChangeEvent } from 'react';
import { WidgetEditorProps } from '../../ContentMapping/ContentMapping';
import { HomepageItem } from './Homepage'
import './Homepage.css';
import { url } from 'inspector';

export const HomepageEditor: React.FC<WidgetEditorProps> = ({
    originalContent, 
    editedContent,
    setEditedContentOnChange
}) => {
    let homepage_content = editedContent.homepage_content || 
        {title: "Title not set", subtitle: "Subtitle not set", backgroundImage: ""};

    const updateTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        homepage_content.title = e.target.value;
        setEditedContentOnChange("homepage_content", homepage_content);
    }

    const updateSubtitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        homepage_content.subtitle = e.target.value;
        setEditedContentOnChange("homepage_content", homepage_content);
    }

    const updateBackgroundImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        homepage_content.backgroundImage = "url(" + e.target.value + ")";
        setEditedContentOnChange("homepage_content", homepage_content);
    }
    
    return <>
        <div className="outer"></div>
        <h1>{homepage_content.title}</h1>
        <h2>{homepage_content.subtitle}</h2>
        
        
        <h3>Title</h3>
        <input type="text" onChange={(e) => updateTitle(e)} />
        <h3>Subtitle</h3>
        <input type="text" onChange={(e) => updateSubtitle(e)} />
        <h3>Background Image</h3>
        <input type="text" onChange={(e) => updateBackgroundImage(e)} />
    </>
}