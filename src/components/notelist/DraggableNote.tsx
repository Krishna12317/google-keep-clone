import React, { useRef, useCallback, useMemo } from "react";
import { useDrag, useDrop } from "react-dnd";
import { MdPinDrop, MdOutlinePinDrop, MdDelete } from "react-icons/md";
import { useTranslation } from "react-i18next";
import { DragableNoteProps } from "./types";
import {
  StyledNoteContent,
  StyledNoteItem,
  StyledNoteList,
  StyledNoteTextArea,
  StyledNoteTitle,
  StyledPinButton,
  StyledDeleteButton, // Assuming you have a styled component for the delete button
} from "../../styles";

const DraggableNote: React.FC<DragableNoteProps> = React.memo(
  ({
    index,
    note,
    moveNote,
    togglePin,
    isPinned,
    handleCheckboxChange,
    deleteNote,
  }) => {
    const ref = useRef<HTMLDivElement>(null);

    const { t: translate } = useTranslation();

    const handleTogglePin = useCallback(() => {
      togglePin(note);
    }, [togglePin, note]);

    const handleDeleteNote = useCallback(() => {
      deleteNote(note.id);
    }, [deleteNote, note.id]);

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
          {isPinned ? (
            <MdPinDrop title={translate("unPinBtn")} />
          ) : (
            <MdOutlinePinDrop title={translate("pinBtn")} />
          )}
        </StyledPinButton>
        <StyledDeleteButton onClick={handleDeleteNote}>
          <MdDelete title={translate("deleteItemBtn")} />
        </StyledDeleteButton>
        <StyledNoteTitle>{note.title}</StyledNoteTitle>
        {noteContent}
      </StyledNoteItem>
    );
  }
);

export default DraggableNote;
