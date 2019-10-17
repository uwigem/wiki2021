import React, { useState } from 'react';
import { WidgetEditorProps } from '../../ContentMapping/ContentMapping';

export const VerticalSlideshowEditor: React.FC<WidgetEditorProps> = ({
	originalContent,
	editedContent,
	setEditedContentOnChange
}) => {
	const verticalSlideshowContent = editedContent.vertical_slideshow_content || [];

	const updateSingleSlideshowContent = (image: string, index: number) => {
		const newContent = verticalSlideshowContent.slice();
		newContent[index] = {
			image
		};
		setEditedContentOnChange("vertical_slideshow_content", newContent);
	}

	const deleteSlideshowContent = (index: number) => {
		const newContent = verticalSlideshowContent.slice();
		newContent.splice(index, 1);
		setEditedContentOnChange("vertical_slideshow_content", newContent);
	}

	return <div className="vertical-slideshow-editor">
		{verticalSlideshowContent.map((slideshowContent, index) => {
			return <div key={slideshowContent.image}>
				<input
					type="text"
					onChange={(e) => updateSingleSlideshowContent(e.target.value, index)}
					value={slideshowContent.image}
				></input>
				<button
					className="vertical-slideshow-delete-button"
					onClick={() => deleteSlideshowContent(index)}
				>DELETE</button>
			</div>
		})}
		<div>
			<button
				className="vertical-slideshow-add-button"
				onClick={() => {
					const newContent = verticalSlideshowContent.slice()
					newContent.push({ image: "" });
					setEditedContentOnChange("vertical_slideshow_content", newContent);
				}}
			>Add</button>
		</div>
	</div>
}