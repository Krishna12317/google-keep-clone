import React, { useRef, useCallback } from "react";
import { useDrag, useDrop } from "react-dnd";
import { MdPinDrop, MdOutlinePinDrop, MdDelete } from "react-icons/md";
import { useTranslation } from "react-i18next";
import { DragableNoteProps } from "./types";
import {
  StyledNoteItem,
  StyledNoteTitle,
  StyledPinButton,
  StyledDeleteButton,
} from "../../styles";
import NoteContent from "./NoteContent";

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
        <NoteContent note={note} handleCheckbox={handleCheckbox} />
      </StyledNoteItem>
    );
  }
);

export default DraggableNote;
