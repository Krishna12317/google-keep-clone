import React, { useCallback, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { RiFileList3Line } from "react-icons/ri";
import { useTranslation } from "react-i18next";
import { Note } from "./types";
import NoteInput from "./components/notelist/NoteInput";
import NoteList from "./components/notelist/NoteList";
import { StyledAppContainer, StyledNoteListContainer } from "./styles";

const App = React.memo(() => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [pinnedNotes, setPinnedNotes] = useState<Note[]>([]);
  const { t: translate } = useTranslation();

  const handledAddingNote = useCallback(
    (note: Note) => {
      setNotes([...notes, note]);
    },
    [notes]
  );

  const togglePin = useCallback(
    (note: Note) => {
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
    <DndProvider backend={HTML5Backend}>
      <StyledAppContainer>
        <h1>{translate("title")}</h1>
        <NoteInput onAddNote={handledAddingNote} />
        <StyledNoteListContainer>
          {" "}
          // create a components for deciding whether pinned note would be
          rendered
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
            <>
              <RiFileList3Line size={48} />
              <p>{translate("emptyNotes")}</p>
            </>
          )}
        </StyledNoteListContainer>
      </StyledAppContainer>
    </DndProvider>
  );
});

export default App;
