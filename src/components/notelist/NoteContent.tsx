import React from "react";
import { StyledNoteTextArea } from "../../styles";
import NoteItem from "./NoteItem";
import { INoteContentProps } from "./types";
import { ListItem } from "../../types";

const NoteContent = React.memo(
  ({ note, handleCheckbox }: INoteContentProps) => {
    if (typeof note.content === "string") {
      return <StyledNoteTextArea onChange={() => {}} value={note.content} />;
    } else {
      const items = note.content as ListItem[];
      const activeItems = items.filter((item) => !item.completed);
      const completedItems = items.filter((item) => item.completed);

      return (
        <>
          <NoteItem
            items={activeItems}
            handleCheckbox={handleCheckbox}
            noteId={note.id}
          />
          {completedItems.length > 0 && (
            <NoteItem
              items={completedItems}
              handleCheckbox={handleCheckbox}
              noteId={note.id}
            />
          )}
        </>
      );
    }
  }
);

export default NoteContent;
