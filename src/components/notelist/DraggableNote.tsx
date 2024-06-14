import React, { useRef, useCallback, useMemo } from "react";
import { useDrag, useDrop } from "react-dnd";
import { MdPinDrop, MdOutlinePinDrop } from "react-icons/md";
import { DragableNoteProps } from "./types";
import {
  StyledNoteContent,
  StyledNoteItem,
  StyledNoteList,
  StyledNoteTextArea,
  StyledNoteTitle,
  StyledPinButton,
} from "../../styles";

const DraggableNote: React.FC<DragableNoteProps> = React.memo(
  ({ index, note, moveNote, togglePin, isPinned, handleCheckboxChange }) => {
    const ref = useRef<HTMLDivElement>(null);

    const handleTogglePin = useCallback(() => {
      togglePin(note);
    }, [togglePin, note]);

    const handleCheckbox = useCallback(
      (noteId: number, itemId: number) => {
        return handleCheckboxChange(noteId, itemId);
      },
      [handleCheckboxChange]
    );

    const [{ isDragging }, drag] = useDrag({
      type: "NOTE",
      item: { index },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    });

    const [, drop] = useDrop({
      accept: "NOTE",
      hover(item: { index: number }) {
        if (!ref.current) {
          return;
        }
        const dragIndex = item.index;
        const hoverIndex = index;

        if (dragIndex === hoverIndex) {
          return;
        }

        moveNote(dragIndex, hoverIndex);
        item.index = hoverIndex;
      },
    });

    drag(drop(ref));

    const noteContent = useMemo(() => {
      if (typeof note.content === "string") {
        return <StyledNoteTextArea value={note.content} />;
      } else {
        return (
          <StyledNoteList>
            {note.content.map((item) => (
              <StyledNoteContent as="li" key={item.id}>
                <input
                  type="checkbox"
                  checked={item.completed}
                  onChange={() => handleCheckbox(note.id, item.id)}
                />
                <span
                  style={{
                    textDecoration: item.completed ? "line-through" : "none",
                  }}
                >
                  {item.text}
                </span>
              </StyledNoteContent>
            ))}
          </StyledNoteList>
        );
      }
    }, [note.content, handleCheckbox]);

    return (
      <StyledNoteItem
        ref={ref}
        color={note.color}
        style={{ opacity: isDragging ? 0.5 : 1 }}
      >
        <StyledPinButton onClick={handleTogglePin}>
          {isPinned ? <MdPinDrop /> : <MdOutlinePinDrop />}
        </StyledPinButton>
        <StyledNoteTitle>{note.title}</StyledNoteTitle>
        {noteContent}
      </StyledNoteItem>
    );
  }
);

export default DraggableNote;
