import React from "react";
import {
  StyledCheckbox,
  StyledNoteContent,
  StyledNoteList,
  StyledText,
} from "../../styles";
import { INoteItemProps } from "./types";

const NoteItem = React.memo(
  ({ items, handleCheckbox, noteId }: INoteItemProps) => (
    <StyledNoteList>
      {items.map((item) => (
        <StyledNoteContent as="li" key={item.id}>
          <StyledCheckbox
            checked={item.completed}
            onChange={() => handleCheckbox(noteId, item.id)}
          />
          <StyledText isSelected={item.completed}>{item.text}</StyledText>
        </StyledNoteContent>
      ))}
    </StyledNoteList>
  )
);

export default NoteItem;
