import React, {
  useState,
  useRef,
  useEffect,
  useReducer,
  useCallback,
  useMemo,
} from "react";
import { useTranslation } from "react-i18next";
import { AddNoteFunction, Note } from "./types";
import {
  StyledContainer,
  StyledTaskForm,
  StyledInput,
  StyledTextArea,
  StyledButton,
  StyledColorPaletteContainer,
  StyledColorPalette,
  StyledColorOption,
  StyledDiv,
  StyledFlexRowDiv,
  StyledColorButton,
  StyledButtonGroup,
} from "../../styles";
import { initialColorPalette } from "../../constants/colorPalette";
import TodoList, { initialState, todoReducer } from "../todolist/TodoList";

const NoteInput: React.FC<{ onAddNote: AddNoteFunction }> = ({ onAddNote }) => {
  const [showAddTask, setShowAddTask] = useState(false);
  const [colorTask, setColorTask] = useState("#ffffff");
  const [showColorPalette, setShowColorPalette] = useState(false);
  const [title, setTitle] = useState("");
  const [textContent, setTextContent] = useState("");
  const [todos, dispatchTodoAction] = useReducer(todoReducer, initialState);
  const [isTextNote, setIsTextNote] = useState(true);
  const { t: translate } = useTranslation();

  const colorPaletteRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (
        colorPaletteRef.current &&
        !colorPaletteRef.current.contains(e.target as Node)
      ) {
        setShowColorPalette(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const handleFocusTextArea = useCallback(() => {
    setShowAddTask(true);
  }, []);

  const toggleListNote = useCallback(() => {
    if (!isTextNote) {
      setIsTextNote(true);
    } else {
      setIsTextNote(false);
      setShowAddTask(true);
      setColorTask("#ffffff");
    }
  }, [isTextNote]);

  const clearTodos = useCallback(
    () => dispatchTodoAction({ type: "CLEAR_TODOS" }),
    []
  );

  const addNewTaskHandler = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (textContent !== "" || todos.length > 0) {
        const noteData: Note = {
          id: Date.now(),
          title: title,
          type: isTextNote ? "text" : "list",
          content: isTextNote ? textContent : todos,
          color: colorTask,
        };
        onAddNote(noteData);
        setTitle("");
        setTextContent("");
        setShowAddTask(false);
        setIsTextNote(true);
        setColorTask("#ffffff");
        !isTextNote && clearTodos();
      } else {
        setTitle("");
        setTextContent("");
        setShowAddTask(false);
        setIsTextNote(true);
        setColorTask("#ffffff");
      }
    },
    [isTextNote, todos, title, textContent, colorTask, onAddNote, clearTodos]
  );

  const closeNoteHandler = useCallback(() => {
    setShowAddTask(false);
    setIsTextNote(true);
    setTextContent("");
    setColorTask("#ffffff");
    !isTextNote && clearTodos();
  }, [clearTodos, isTextNote]);

  const handleColorButtonClick = useCallback(() => {
    setShowColorPalette((prev) => !prev);
  }, []);

  const handleColorSelection = useCallback((selectedColor: string) => {
    setColorTask(selectedColor);
    setShowColorPalette(false);
  }, []);

  const addTodo = useCallback(() => {
    const id = Date.now();
    dispatchTodoAction({ type: "ADD_TODO", payload: { id } });
    return id;
  }, []);

  const toggleTodo = useCallback((id: number) => {
    dispatchTodoAction({ type: "TOGGLE_TODO", payload: { id } });
  }, []);

  const deleteTodo = useCallback((id: number) => {
    dispatchTodoAction({ type: "DELETE_TODO", payload: { id } });
  }, []);

  const changeTodoText = useCallback((id: number, text: string) => {
    dispatchTodoAction({ type: "CHANGE_TODO_TEXT", payload: { id, text } });
  }, []);

  const memoizedColorPalette = useMemo(
    () => (
      <StyledColorPalette>
        {initialColorPalette.map((color) => (
          <StyledColorOption
            key={color.code}
            color={color.code}
            isSelected={colorTask === color.code}
            onClick={() => handleColorSelection(color.code)}
          />
        ))}
      </StyledColorPalette>
    ),
    [colorTask, handleColorSelection]
  );

  return (
    <StyledContainer>
      <StyledTaskForm
        showAddTask={showAddTask}
        colorTask={colorTask}
        onSubmit={addNewTaskHandler}
      >
        {showAddTask && (
          <StyledDiv>
            <StyledInput
              type="text"
              name="title"
              placeholder="Title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </StyledDiv>
        )}
        {isTextNote ? (
          <StyledTextArea
            showAddTask={showAddTask}
            name="description"
            placeholder={translate("addNote")}
            value={textContent}
            onFocus={handleFocusTextArea}
            onChange={(e) => setTextContent(e.target.value)}
          />
        ) : (
          <div>
            <TodoList
              todos={todos}
              onAdd={addTodo}
              onToggle={toggleTodo}
              onDelete={deleteTodo}
              onTextChange={changeTodoText}
            />
          </div>
        )}
        {!showAddTask && (
          <StyledDiv>
            <StyledButton title={translate("addList")} onClick={toggleListNote}>
              ☑️
            </StyledButton>
          </StyledDiv>
        )}
        {showAddTask && (
          <>
            <StyledFlexRowDiv>
              <StyledButtonGroup>
                <StyledColorPaletteContainer ref={colorPaletteRef}>
                  <StyledColorButton
                    title={translate("colorPicker")}
                    onClick={handleColorButtonClick}
                  >
                    🎨
                  </StyledColorButton>
                  {showColorPalette && memoizedColorPalette}
                </StyledColorPaletteContainer>
                <StyledButton
                  title={translate("close")}
                  type="button"
                  onClick={closeNoteHandler}
                >
                  Close
                </StyledButton>
                <StyledButton title={translate("addNoteBtn")} type="submit">
                  Add a note
                </StyledButton>
              </StyledButtonGroup>
            </StyledFlexRowDiv>
          </>
        )}
      </StyledTaskForm>
    </StyledContainer>
  );
};

export default React.memo(NoteInput);
