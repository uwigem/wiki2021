import { ToDoListItem } from '../ContentWidgets/ToDoList/ToDoList';
import { Tab } from '../ContentWidgets/TabView/TabView';

export type ContentSingularData = {
    plainText_content?: string
    exampleImage_imageLink?: string
    exampleImage_percentageSize?: number
    toDoList_content?: ToDoListItem[]
    tabView_content?: Tab[]
    tabView_current?: number
    [idx: string]: any
}