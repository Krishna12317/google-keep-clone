export type NoteType = 'text' | 'list';
export interface IListItem {
    id: number;
    text: string;
    completed: boolean;
}
