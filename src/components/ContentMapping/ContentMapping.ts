import React from 'react';
import { PlainText } from "../ContentWidgets/PlainText/PlainText";
import { PlainTextEditor } from "../ContentWidgets/PlainText/PlainTextEditor";
import { Stub, StubEditor } from '../ContentWidgets/_Stub/Stub';
import { ContentSingularData } from '../_data/ContentSingularData';
import { ExampleImage } from '../ContentWidgets/ExampleImage/ExampleImage';
import { ExampleImageEditor } from '../ContentWidgets/ExampleImage/ExampleImageEditor';
import { TabView } from '../ContentWidgets/TabView/TabView';
import { TabViewEditor } from '../ContentWidgets/TabView/TabViewEditor';

export type WidgetEditorProps = {
    originalContent: ContentSingularData,
    editedContent: ContentSingularData,
    setEditedContentOnChange: (keyToChange: string, valueToChange: any) => void
}

type ContentMappingType = {
    [idx: string]: {
        widget: React.FC<ContentSingularData>,
        editor: React.FC<WidgetEditorProps>
    }
}

export enum WidgetTypes {
    PLAIN_TEXT = "PLAIN_TEXT",
    STUB = "STUB",
    EXAMPLE_IMAGE = "EXAMPLE_IMAGE",
    TAB_VIEW = "TAB_VIEW"
}

export const ContentMapping: ContentMappingType = {
    PLAIN_TEXT: {
        widget: PlainText,
        editor: PlainTextEditor
    },
    STUB: {
        widget: Stub,
        editor: StubEditor
    },
    EXAMPLE_IMAGE: {
        widget: ExampleImage,
        editor: ExampleImageEditor
    },
    TAB_VIEW: {
        widget: TabView,
        editor: TabViewEditor
    }
}