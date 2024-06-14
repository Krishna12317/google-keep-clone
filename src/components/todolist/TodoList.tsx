import React, {
  useRef,
  useEffect,
  useCallback,
  useMemo,
  useState,
} from "react";
import {
  StyledTodoContainer,
  StyledSection,
  StyledHeader,
  StyledToggleButton,
  StyledInputContainer,
  StyledTodoInput,
  StyledAddIcon,
  StyledExpandIcon,
} from "../../styles";
import { MdExpandMore, MdExpandLess } from "react-icons/md";
import TodoItem from "./TodoItem";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

interface TodoListProps {
  todos: Todo[];
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

export const initialState: Todo[] = [];

export const todoReducer = (state: Todo[], action: Action): Todo[] => {
  switch (action.type) {
    case "ADD_TODO":
      return [...state, { id: action.payload.id, text: "", completed: false }];
    case "TOGGLE_TODO":
      return state.map((todo) =>
        todo.id === action.payload.id
          ? { ...todo, completed: !todo.completed }
          : todo
      );
    case "DELETE_TODO":
      return state.filter((todo) => todo.id !== action.payload.id);
    case "CHANGE_TODO_TEXT":
      return state.map((todo) =>
        todo.id === action.payload.id
          ? { ...todo, text: action.payload.text }
          : todo
      );
    case "CLEAR_TODOS":
      return [];
    default:
      return state;
  }
};

const TodoList: React.FC<TodoListProps> = ({
  todos,
  onAdd,
  onToggle,
  onDelete,
  onTextChange,
}) => {
  const [focusOnNewTodo, setFocusOnNewTodo] = useState(false);
  const [isCompletedCollapsed, setIsCompletedCollapsed] = useState(false);
  const newTodoRef = useRef<HTMLInputElement>(null);

  const handleFocus = useCallback(() => {
    const id = onAdd(); // Add todo and get its id
    if (id) {
      setFocusOnNewTodo(true); // Set focus state to true after adding new todo
    }
  }, [onAdd]);

  useEffect(() => {
    if (focusOnNewTodo && newTodoRef.current) {
      newTodoRef.current.focus();
      setFocusOnNewTodo(false); // Reset focus state after focusing
    }
  }, [focusOnNewTodo]);

  const activeTodos = useMemo(
    () => todos.filter((todo) => !todo.completed),
    [todos]
  );
  const completedTodos = useMemo(
    () => todos.filter((todo) => todo.completed),
    [todos]
  );

  const toggleCompletedCollapse = () => {
    setIsCompletedCollapsed((prev) => !prev);
  };

  return (
    <StyledTodoContainer>
      <StyledSection>
        {activeTodos.map((todo, index) => (
          <TodoItem
            key={todo.id}
            id={todo.id}
            text={todo.text}
            completed={todo.completed}
            onToggle={onToggle}
            onDelete={onDelete}
            onTextChange={onTextChange}
            inputRef={index === activeTodos.length - 1 ? newTodoRef : undefined}
          />
        ))}
      </StyledSection>
      <StyledInputContainer>
        <StyledAddIcon onClick={handleFocus} />
        <StyledTodoInput
          type="text"
          placeholder="Take a note..."
          onFocus={handleFocus}
          readOnly
        />
      </StyledInputContainer>
      {completedTodos.length > 0 && (
        <StyledSection>
          <StyledHeader>
            <h2>{completedTodos.length} Completed</h2>
            <StyledToggleButton onClick={toggleCompletedCollapse}>
              {isCompletedCollapsed ? (
                <>
                  <StyledExpandIcon>
                    <MdExpandMore />
                  </StyledExpandIcon>
                </>
              ) : (
                <>
                  <StyledExpandIcon>
                    <MdExpandLess />
                  </StyledExpandIcon>
                </>
              )}
            </StyledToggleButton>
          </StyledHeader>
          {!isCompletedCollapsed && (
            <>
              {completedTodos.map((todo) => (
                <TodoItem
                  key={todo.id}
                  id={todo.id}
                  text={todo.text}
                  completed={todo.completed}
                  onToggle={onToggle}
                  onDelete={onDelete}
                  onTextChange={onTextChange}
                />
              ))}
            </>
          )}
        </StyledSection>
      )}
    </StyledTodoContainer>
  );
};

export default TodoList;
