import React from 'react';
import { ContentSingularData } from '../../_data/ContentSingularData';

/**
 * PlainText is a plain text widget to act as an example widget
 * 
 * Last Modified
 * William Kwok
 * June 16, 2019
 */
export const Header: React.FC<ContentSingularData> = ({ header_content, header_priority }) => {
    if (header_priority == 1) {
        return <h1>{header_content}</h1>;
    } else if (header_priority == 2) {
        return <h2>{header_content}</h2>;
    } else if (header_priority == 3) {
        return <h3>{header_content}</h3>;
    } else {
        return <h4>{header_content}</h4>;
    }
}
