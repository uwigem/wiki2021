import React, { memo } from 'react';
import { Stub, StubEditor } from '../ContentWidgets/_Stub/Stub';
import { ContentSingularData } from '../_data/ContentSingularData';
import { Banner } from '../ContentWidgets/Banner/Banner';
import { BannerEditor } from '../ContentWidgets/Banner/BannerEditor';
import { TabView } from '../ContentWidgets/TabView/TabView';
import { TabViewEditor } from '../ContentWidgets/TabView/TabViewEditor';
import { Header } from '../ContentWidgets/Header/Header';
import { HeaderEditor } from '../ContentWidgets/Header/HeaderEditor';
import { PdfViewer } from '../ContentWidgets/PdfViewer/PdfViewer';
import { PdfViewerEditor } from '../ContentWidgets/PdfViewer/PdfViewerEditor';
import { Video } from '../ContentWidgets/Video/Video';
import { VideoEditor } from '../ContentWidgets/Video/VideoEditor';
import { ImagesInRow } from '../ContentWidgets/ImagesInRow/ImagesInRow';
import { ImagesInRowEditor } from '../ContentWidgets/ImagesInRow/ImagesInRowEditor';
import { Separator } from '../ContentWidgets/Separator/Separator';
import { SeparatorEditor } from '../ContentWidgets/Separator/SeparatorEditor';
import { Gallery } from '../ContentWidgets/Gallery/Gallery';
import { GalleryEditor } from '../ContentWidgets/Gallery/GalleryEditor';

import { WYSIWYGEditor } from '../ContentWidgets/WYSIWYG/WYSIWYGEditor';
import { WYSIWYGWidget } from '../ContentWidgets/WYSIWYG/WYSIWYGWidget';
import { Accordion } from '../ContentWidgets/Accordion/Accordion';
import { AccordionEditor } from '../ContentWidgets/Accordion/AccordionEditor';
import { TeamPage } from '../ContentWidgets/TeamPage/TeamPage';
import { TeamPageEditor } from '../ContentWidgets/TeamPage/TeamPageEditor';
import { ImageCarousel } from '../ContentWidgets/ImageCarousel.tsx/ImageCarousel';
import { ImageCarouselEditor } from '../ContentWidgets/ImageCarousel.tsx/ImageCarouselEditor';
import { ExampleImage } from '../ContentWidgets/ExampleImage/ExampleImage';
import { ExampleImageEditor } from '../ContentWidgets/ExampleImage/ExampleImageEditor';
import { HorizontalDivider } from '../ContentWidgets/Layouts/HorizontalDivider/HorizontalDivider';
import { HorizontalDividerEditor } from '../ContentWidgets/Layouts/HorizontalDivider/HorizontalDividerEditor';
import GridLayout from '../ContentWidgets/Layouts/GridLayout/GridLayout';
import GridLayoutEditor from '../ContentWidgets/Layouts/GridLayout/GridLayoutEditor';


export type WidgetEditorProps = {
	originalContent: ContentSingularData,
	editedContent: ContentSingularData,
	setEditedContentOnChange: (keyToChange: string, valueToChange: any) => void
}

export type ContentMappingType = {
	[idx: string]: ContentMappingElementType
}

export type ContentMappingElementType = {
	widget: React.FC<ContentSingularData>,
	editor: React.FC<WidgetEditorProps>
	displayName: string,
	widgetCategory: WidgetCategories
	imgPreview?: string
}

export enum WidgetCategories {
	Display = "Display",
	Media = "Media",
	Text = "Text",
    Layout = "Layout"
}

export enum WidgetTypes {
	PLAIN_TEXT = "PLAIN_TEXT",
	STUB = "STUB",
	EXAMPLE_IMAGE = "EXAMPLE_IMAGE",
	TAB_VIEW = "TAB_VIEW",
	SEPARATOR = "SEPARATOR",
	IMAGES_IN_ROW = "IMAGES_IN_ROW",
	PDF_VIEWER = "PDF_VIEWER",
	VIDEO = "VIDEO",
	GALLERY = "GALLERY",
	WYSIWYG_EDITOR = "WYSIWYG_EDITOR",
	BANNER = "BANNER",
	ACCORDION = "ACCORDION",
	TEAMPAGE = "TEAMPAGE",
	HEADER = "HEADER",
	CAROUSEL = "CAROUSEL",
    HORIZONTAL_DIVIDER = "HORIZONTAL_DIVIDER",
    IMAGE = "IMAGE",
    GRID_LAYOUT = "GRID_LAYOUT"
}

export const ContentMapping: ContentMappingType = {
	// PLAIN_TEXT: {
	// 	widget: memo(PlainText,
	// 	editor: PlainTextEditor,
	// 	displayName: "Plain Text",
	// 	widgetCategory: WidgetCategories.Text
	// },
	STUB: {
		widget: memo(Stub),
		editor: StubEditor,
		displayName: "Stub",
		widgetCategory: WidgetCategories.Display
	},
	TAB_VIEW: {
		widget: memo(TabView),
		editor: TabViewEditor,
		displayName: "Tab View",
		widgetCategory: WidgetCategories.Display
	},
	IMAGES_IN_ROW: {
		widget: memo(ImagesInRow),
		editor: ImagesInRowEditor,
		displayName: "Images in Row",
		widgetCategory: WidgetCategories.Media
	},
	SEPARATOR: {
		widget: memo(Separator),
		editor: SeparatorEditor,
		displayName: "Seperator",
		widgetCategory: WidgetCategories.Display
	},
	PDF_VIEWER: {
		widget: memo(PdfViewer),
		editor: PdfViewerEditor,
		displayName: "PDF Viewer",
		widgetCategory: WidgetCategories.Media
	},
	VIDEO: {
		widget: memo(Video),
		editor: VideoEditor,
		displayName: "Video",
		widgetCategory: WidgetCategories.Media
	},
	GALLERY: {
		widget: memo(Gallery),
		editor: GalleryEditor,
		displayName: "Gallery",
		widgetCategory: WidgetCategories.Media
	},
	WYSIWYG_EDITOR: {
		widget: memo(WYSIWYGWidget),
		editor: WYSIWYGEditor,
		displayName: "Rich Text Editor",
		widgetCategory: WidgetCategories.Text
	},
	BANNER: {
		widget: memo(Banner),
		editor: BannerEditor,
		displayName: "Banner",
		widgetCategory: WidgetCategories.Display
	},
	ACCORDION: {
		widget: memo(Accordion),
		editor: AccordionEditor,
		displayName: "Accordion",
		widgetCategory: WidgetCategories.Display
	},
	HEADER: {
		widget: memo(Header),
		editor: HeaderEditor,
		displayName: "Header",
		widgetCategory: WidgetCategories.Text
	},
	CAROUSEL: {
		widget: memo(ImageCarousel),
		editor: ImageCarouselEditor,
		displayName: "Image Carousel",
		widgetCategory: WidgetCategories.Media
	},
	IMAGE: {
		widget: memo(ExampleImage),
		editor: ExampleImageEditor,
		displayName: "Image",
		widgetCategory: WidgetCategories.Media
	},
    HORIZONTAL_DIVIDER: {
        widget: memo(HorizontalDivider),
        editor: HorizontalDividerEditor,
        displayName: "Horizontal Divider",
        widgetCategory: WidgetCategories.Layout
    },
    GRID_LAYOUT: {
        widget: memo(GridLayout),
        editor: GridLayoutEditor,
        displayName: "Grid Layout",
        widgetCategory: WidgetCategories.Layout
    }
}

export const ExampleWidget = {
    type: WidgetTypes.IMAGE,
    content: {
        exampleImage_imageLink: "https://2019.igem.org/wiki/images/9/92/T--Washington--Wetlab_and_Simulations.png",
        exampleImage_percentageSize: 100,
        exampleImage_subtitle: "Example Widget"
    }
}