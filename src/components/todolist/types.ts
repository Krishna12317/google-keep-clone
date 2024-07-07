export interface ITodoItemProps {
    id: number;
    text: string;
    completed: boolean;
    onToggle: (id: number) => void;
    onDelete: (id: number) => void;
    onTextChange: (id: number, text: string) => void;
    inputRef?: React.RefObject<HTMLInputElement>;
}


export interface ITodo {
    id: number;
    text: string;
    completed: boolean;
}

export interface ITodoListProps {
    todos: ITodo[];
    onAdd: () => number;
    onToggle: (id: number) => void;
    onDelete: (id: number) => void;
    onTextChange: (id: number, text: string) => void;
}

export type Action =
    | { type: "ADD_TODO"; payload: { id: number } }
    | { type: "TOGGLE_TODO"; payload: { id: number } }
    | { type: "DELETE_TODO"; payload: { id: number } }
    | { type: "CHANGE_TODO_TEXT"; payload: { id: number; text: string } }
    | { type: "CLEAR_TODOS" };
