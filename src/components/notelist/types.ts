import { ListItem } from "../../types";

export type NoteType = "text" | "list";

export interface Note {
    id: number;
    title: string;
    type: NoteType;
    content: string | ListItem[];
    color: string;
}

export type AddNoteFunction = (noteData: Note) => void;

export interface NoteListProps {
    title: string;
    notes: Note[];
    setNotes: React.Dispatch<React.SetStateAction<Note[]>>;
    togglePin: (note: Note) => void;
    isPinned: boolean;
}

export interface DragableNoteProps {
    index: number;
    note: Note;
    moveNote: (dragIndex: number, hoverIndex: number) => void;
    togglePin: (note: Note) => void;
    isPinned: boolean;
    handleCheckboxChange: (noteId: number, itemId: number) => void;
    deleteNote: (noteId: number) => void;
}

export interface INoteContentProps {
    note: Note;
    handleCheckbox: (noteId: number, itemId: number) => void;
}

export interface INoteItemProps {
    items: ListItem[],
    handleCheckbox: (noteId: number, itemId: number) => void, noteId: number
}
