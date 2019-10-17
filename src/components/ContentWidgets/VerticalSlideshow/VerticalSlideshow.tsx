import React, { useState } from 'react';
import { ContentSingularData } from '../../_data/ContentSingularData';
import {
	CarouselProvider,
	Image,
	Slide,
	Slider
} from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import './VerticalSlideshow.css';

export type SingleVerticalSlideshowContent = {
	image: string,
	// alt: string // TODO: support alt tags
}

export const VerticalSlideshow: React.FC<ContentSingularData> = ({
	vertical_slideshow_content
}) => {
	if (!vertical_slideshow_content) {
		return <></>
	}

	return <div className="vertical-slideshow">
		<CarouselProvider
			naturalSlideHeight={0.3 * window.innerHeight}
			naturalSlideWidth={0.6 * window.innerWidth}
			totalSlides={vertical_slideshow_content.length}
		>
			<Slider>
				{vertical_slideshow_content.map((slideshowContent, idx) => {
					return <Image
						key={slideshowContent.image}
						hasMasterSpinner={true}
						src={slideshowContent.image}
					>

					</Image>
				})}
			</Slider>
		</CarouselProvider>
	</div>
}