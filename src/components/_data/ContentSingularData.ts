import { ToDoListItem } from '../ContentWidgets/ToDoList/ToDoList';

export type ContentSingularData = {
    plainText_content?: string
    exampleImage_imageLink?: string
    exampleImage_percentageSize?: number
    toDoList_content?: ToDoListItem[]
    [idx: string]: any
}