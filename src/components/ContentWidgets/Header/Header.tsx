import React from 'react';
import { ContentSingularData } from '../../_data/ContentSingularData';

/**
 * Header is a header text widget
 * 
 * Last Modified
 * Elisa Truong
 * September 1, 2019
 */
export const Header: React.FC<ContentSingularData> = ({ header_content, header_priority }) => {
    let header;
    if (header_priority == 1) {
        header =  <h1>{header_content}</h1>;
    } else if (header_priority == 2) {
        header =  <h2>{header_content}</h2>;
    } else if (header_priority == 3) {
        header =  <h3>{header_content}</h3>;
    } else {
        header =  <h4>{header_content}</h4>;
    }

    return <div>
        {header}
    </div>
}
