import React, { useCallback } from "react";
import { NoteListProps } from "./types";
import { ListItem } from "../../types";
import DraggableNote from "./DraggableNote";
import { StyledNoteListWrapper } from "../../styles";

const NoteList: React.FC<NoteListProps> = React.memo(
  ({ title, notes, setNotes, togglePin, isPinned }) => {
    const moveNote = useCallback(
      (dragIndex: number, hoverIndex: number) => {
        const draggedNote = notes[dragIndex];
        const newNotes = [...notes];
        newNotes.splice(dragIndex, 1);
        newNotes.splice(hoverIndex, 0, draggedNote);
        setNotes(newNotes);
      },
      [notes, setNotes]
    );

    const handleCheckboxChange = useCallback(
      (noteId: number, itemId: number) => {
        const updatedNotes = notes.map((note) => {
          if (note.id === noteId && note.content.length) {
            const updatedContent = (note.content as ListItem[]).map((item) =>
              item.id === itemId
                ? { ...item, completed: !item.completed }
                : item
            );
            return { ...note, content: updatedContent };
          }
          return note;
        });
        setNotes(updatedNotes);
      },
      [notes, setNotes]
    );

    return (
      <>
        <h4>{title}</h4>
        <StyledNoteListWrapper>
          {notes.map((note, index) => (
            <DraggableNote
              key={note.id}
              index={index}
              note={note}
              moveNote={moveNote}
              togglePin={togglePin}
              isPinned={isPinned}
              handleCheckboxChange={handleCheckboxChange}
            />
          ))}
        </StyledNoteListWrapper>
      </>
    );
  }
);

export default NoteList;
