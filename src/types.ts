export type NoteType = 'text' | 'list';

export interface Note {
    id: number;
    type: NoteType;
    title: string;
    content: string | ListItem[];
    color: string;
}

export interface ListItem {
    id: number;
    text: string;
    completed: boolean;
}
