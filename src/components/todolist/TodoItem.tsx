import React, { useCallback } from "react";
import {
  StyledItemContainer,
  StyledCheckboxIcon,
  StyledTodoItemInput,
  StyledDeleteIcon,
} from "../../styles";
import { MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md";

interface TodoItemProps {
  id: number;
  text: string;
  completed: boolean;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onTextChange: (id: number, text: string) => void;
  inputRef?: React.RefObject<HTMLInputElement>;
}

const TodoItem: React.FC<TodoItemProps> = React.memo(
  ({ id, text, completed, onToggle, onDelete, onTextChange, inputRef }) => {
    const handleToggle = useCallback(() => {
      onToggle(id);
    }, [id, onToggle]);

    const handleDelete = useCallback(() => {
      onDelete(id);
    }, [id, onDelete]);

    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        onTextChange(id, e.target.value);
      },
      [id, onTextChange]
    );

    return (
      <StyledItemContainer>
        <StyledCheckboxIcon onClick={handleToggle}>
          {completed ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}
        </StyledCheckboxIcon>
        <StyledTodoItemInput
          type="text"
          value={text}
          checked={completed}
          onChange={handleChange}
          ref={inputRef}
        />
        <StyledDeleteIcon onClick={handleDelete} />
      </StyledItemContainer>
    );
  }
);

export default TodoItem;
