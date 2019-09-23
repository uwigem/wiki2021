
import { Tab } from '../ContentWidgets/TabView/TabView';
import { WidgetTypes } from '../ContentMapping/ContentMapping';

export type ContentSingularData = {
    plainText_content?: string
    header_content?: string
    header_priority?: number
    exampleImage_imageLink?: string
    exampleImage_percentageSize?: number
    tabView_content?: Tab[]
    [idx: string]: any
}