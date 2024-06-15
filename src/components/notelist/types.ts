import { IListItem } from "../../types";

export type INoteType = "text" | "list";

export interface INote {
    id: number;
    title: string;
    type: INoteType;
    content: string | IListItem[];
    color: string;
}

export type AddNoteFunction = (noteData: INote) => void;

export interface INoteListProps {
    title: string;
    notes: INote[];
    setNotes: React.Dispatch<React.SetStateAction<INote[]>>;
    togglePin: (note: INote) => void;
    isPinned: boolean;
}

export interface IDragableNoteProps {
    index: number;
    note: INote;
    moveNote: (dragIndex: number, hoverIndex: number) => void;
    togglePin: (note: INote) => void;
    isPinned: boolean;
    handleCheckboxChange: (noteId: number, itemId: number) => void;
    deleteNote: (noteId: number) => void;
}
