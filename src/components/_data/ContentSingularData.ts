import { ToDoListItem } from '../ContentWidgets/ToDoList/ToDoList';
import { HomepageItem } from '../ContentWidgets/Homepage/Homepage';

export type ContentSingularData = {
    plainText_content?: string
    exampleImage_imageLink?: string
    exampleImage_percentageSize?: number
    toDoList_content?: ToDoListItem[]
    homepage_content?: HomepageItem
    [idx: string]: any
}