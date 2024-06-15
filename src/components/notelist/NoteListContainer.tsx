// StyledNoteListContainer.tsx
import React, { useCallback, useState } from "react";
import { RiFileList3Line } from "react-icons/ri";
import { useTranslation } from "react-i18next";
import { INote } from "./types";
import NoteList from "./NoteList";
import NoteInput from "./NoteInput";
import {
  StyledEmptyNoteContainer,
  StyledNoteListContainer,
} from "../../styles";

const NoteListContainer: React.FC = () => {
  const [notes, setNotes] = useState<INote[]>([]);
  const [pinnedNotes, setPinnedNotes] = useState<INote[]>([]);
  const { t: translate } = useTranslation();

  const handleAddingNote = useCallback(
    (note: INote) => {
      setNotes([...notes, note]);
    },
    [notes]
  );

  const togglePin = useCallback(
    (note: INote) => {
      if (pinnedNotes.includes(note)) {
        setPinnedNotes(pinnedNotes.filter((n) => n !== note));
        setNotes([...notes, note]);
      } else {
        setPinnedNotes([...pinnedNotes, note]);
        setNotes(notes.filter((n) => n !== note));
      }
    },
    [notes, pinnedNotes]
  );

  return (
    <>
      <NoteInput onAddNote={handleAddingNote} />
      <StyledNoteListContainer>
        {pinnedNotes.length > 0 ? (
          <NoteList
            title={translate("pinned")}
            notes={pinnedNotes}
            setNotes={setPinnedNotes}
            togglePin={togglePin}
            isPinned
          />
        ) : null}
        {notes.length > 0 ? (
          <NoteList
            title={translate("notes")}
            notes={notes}
            setNotes={setNotes}
            togglePin={togglePin}
            isPinned={false}
          />
        ) : (
          <StyledEmptyNoteContainer>
            <RiFileList3Line size={48} />
            <p>{translate("emptyNotes")}</p>
          </StyledEmptyNoteContainer>
        )}
      </StyledNoteListContainer>
    </>
  );
};

export default React.memo(NoteListContainer);
