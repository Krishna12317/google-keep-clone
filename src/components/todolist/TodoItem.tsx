import React, { useCallback } from "react";
import { MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md";
import { useTranslation } from "react-i18next";
import {
  StyledItemContainer,
  StyledCheckboxIcon,
  StyledTodoItemInput,
  StyledDeleteIcon,
} from "../../styles";
import { ITodoItemProps } from "./types";

const TodoItem: React.FC<ITodoItemProps> = React.memo(
  ({ id, text, completed, onToggle, onDelete, onTextChange, inputRef }) => {
    const { t: translate } = useTranslation();

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
        <StyledDeleteIcon
          title={translate("deleteItemBtn")}
          onClick={handleDelete}
        />
      </StyledItemContainer>
    );
  }
);

export default TodoItem;
