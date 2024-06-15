import React, { useCallback } from "react";
import { INoteListProps } from "./types";
import { IListItem } from "../../types";
import DraggableNote from "./DraggableNote";
import { StyledNoteListWrapper } from "../../styles";

const NoteList: React.FC<INoteListProps> = React.memo(
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
            const updatedContent = (note.content as IListItem[]).map((item) =>
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

    const deleteNote = useCallback(
      (noteId: number) => {
        const updatedNotes = notes.filter((note) => note.id !== noteId);
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
              deleteNote={deleteNote}
            />
          ))}
        </StyledNoteListWrapper>
      </>
    );
  }
);

export default NoteList;
