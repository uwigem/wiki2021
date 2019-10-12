import NavbarData, { NavbarType } from './NavbarData/NavbarData';
import { COLORS } from './Constants';
import { ContentSingularData } from './ContentSingularData';

export default class Data {
	static getImgsToPrefetch(): string[] {
		return imgs;
	}

	static getContentData(): ContentData {
		return contentData;
	}

	static getDisplayConstants() {
		return displayConstants;
	}

	static getNavbarDataTitleFromLink(pageTitle: string): string {
		let returnString = "";
		NavbarData.getData().forEach((navItem: NavbarType) => {
			if (navItem.links.indexOf(pageTitle) > -1 ||
				navItem.names.indexOf(pageTitle.split("/")[1]) > -1) {
				returnString = navItem.title;
			}
		});
		return returnString;
	}
}

const imgs: string[] = [];

export type ContentHashMapping = {
	// If the key doesn't exist, it is possible for it to be undefined.
	[idx: string]: ContentSingularData | undefined
}

export type ContentPageData = {
	hasSidebar: boolean
	contentOrder?: string[]
	content?: ContentHashMapping
}

export type ContentData = {
	[idx: string]: ContentPageData,
}

export type PageSpecificColors = {
	[idx: string]: {
		primaryColor: string,
		secondaryColor: string
	}
}

export type DisplayConstants = {
	primaryColor: string,
	secondaryColor: string,
	globalColor: boolean,
	pageSpecificColors: PageSpecificColors,
	logo: string,
	buttonHeight: string
}

const displayConstants: DisplayConstants = {
	primaryColor: COLORS.PURPLE.PRIMARY,
	secondaryColor: COLORS.PURPLE.SECONDARY,
	globalColor: false,
	pageSpecificColors: {
		Home: {
			primaryColor: "#FFFFFF",
			secondaryColor: "#FFFF00"
		},
		Project: {
			primaryColor: "#FF0000",
			secondaryColor: "#00FF00"
		}
	},
	logo: "http://2017.igem.org/wiki/images/e/e9/T--Washington--WLogo.png",
	buttonHeight: "16px"
}

const backupcontentData: ContentData = {
	"MAIN_PAGE": {
		hasSidebar: false,
		contentOrder: ["123"],
		content: {
			"123": {
				type: "PLAIN_TEXT",
				plainText_content: "test"
			}
		}
	}
}

/** For testing */
const contentData: ContentData = {
	"wkwokTestPage": {
		"content": {
			"0169ed8b81c": {
				"accordion_content": [{
					"panel": "# test \n\ntest ciontent",
					"title": ""
				}],
				"type": "ACCORDION"
			},
			"02ee431429": {
				"imagesInRow_items": [{
					"externalLink": "",
					"imgAltTag": "test test",
					"imgCaption": "test",
					"imgLink": "https://2019.igem.org/wiki/images/0/00/T--Washington--testimage3.png"
				}],
				"plainText_content": "Hi there",
				"type": "IMAGES_IN_ROW"
			},
			"0fb0e2a2b09": {
				"tabView_content": [{
					"tabContent": "fdsafdsafdsafdsafdsafs #\n\n# test",
					"tabLabel": "Tab1ffd"
				}],
				"type": "TAB_VIEW"
			},
			"15a330f726": {
				"plainText_content": "fgdajkghdslkafhsakghdsalfkhalgjksdhfklasghdslkajfhdasljkgsdhflakjghdsfdsagdsafdgasdfsagfadsfsfas dfs fsda fads fdsa fdasf sad fdsa fdsa fasf sa fsa fas faes fadsf adsf asd fasdf sad faesf as ffas\\n\\n\\n\\n\\ fdsa fds fads fadsf dsaf sdaf sd fasd fdsa fasd fdsa fd",
				"type": "PLAIN_TEXT"
			},
			"3be27e635275": {
				"pdfViewer_pdfHeightPixel": 200,
				"pdfViewer_pdfLink": "http://2018.igem.org/wiki/images/5/5e/T--Washington--BusinessPlan.pdf",
				"pdfViewer_pdfWidthPercentage": 100,
				"type": "PDF_VIEWER"
			},
			"648e75ba1821": {
				"type": "SEPARATOR"
			},
			"7897d11def6": {
				"separator_width": "40",
				"type": "SEPARATOR"
			},
			"7b2a30081ff1": {
				"type": "STUB"
			},
			"a211bc4593ca": {
				"type": "VIDEO",
				"video_videoLink": "http://2017.igem.org/wiki/images/b/b6/T--Washington--Enclosure_explosion.mp4",
				"video_videoWidthPercentage": 80
			},
			"cb20baf1bf81": {
				"bannder_content": {
					"bannerText": "Human practices",
					"imageBlur": 9,
					"imageLink": "https://via.placeholder.com/350x150",
					"imageTopX": 47,
					"imageTopY": 52,
					"imageZoom": 87,
					"textColor": "WHITE",
					"textSize": 10
				},
				"banner_content": {
					"bannerText": "Human practices",
					"imageBlur": 9,
					"imageLink": "https://via.placeholder.com/350x150",
					"imageTopX": 47,
					"imageTopY": 52,
					"imageZoom": 87,
					"textColor": "WHITE",
					"textSize": 10
				},
				"type": "BANNER"
			},
			"e54825089540": {
				"type": "WYSIWYG_EDITOR",
				"wysiwyg_content": "<p>testestsetse</p>\n"
			}
		},
		"contentOrder": ["e54825089540", "7b2a30081ff1", "cb20baf1bf81", "0169ed8b81c", "0fb0e2a2b09", "a211bc4593ca", "3be27e635275", "02ee431429", "7897d11def6", "648e75ba1821", "15a330f726"],
		"hasSidebar": false
	}
}
