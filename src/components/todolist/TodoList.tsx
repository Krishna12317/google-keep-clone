import React, {
  useRef,
  useEffect,
  useCallback,
  useMemo,
  useState,
} from "react";
import { useTranslation } from "react-i18next";
import { MdExpandMore, MdExpandLess } from "react-icons/md";
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
import TodoItem from "./TodoItem";
import { ITodo, Action, ITodoListProps } from "./types";

export const initialState: ITodo[] = [];

export const todoReducer = (state: ITodo[], action: Action): ITodo[] => {
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

const TodoList: React.FC<ITodoListProps> = ({
  todos,
  onAdd,
  onToggle,
  onDelete,
  onTextChange,
}) => {
  const [focusOnNewTodo, setFocusOnNewTodo] = useState(false);
  const [isCompletedCollapsed, setIsCompletedCollapsed] = useState(false);
  const newTodoRef = useRef<HTMLInputElement>(null);
  const { t: translate } = useTranslation();

  const handleFocus = useCallback(() => {
    const id = onAdd();
    if (id) {
      setFocusOnNewTodo(true);
    }
  }, [onAdd]);

  useEffect(() => {
    if (focusOnNewTodo && newTodoRef.current) {
      newTodoRef.current.focus();
      setFocusOnNewTodo(false);
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
          placeholder={translate("addTodo")}
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
