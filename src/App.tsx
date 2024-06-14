// App.tsx
import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useTranslation } from "react-i18next";
import NoteListContainer from "./components/notelist/NoteListContainer";
import { StyledAppContainer } from "./styles";

const App: React.FC = React.memo(() => {
  const { t: translate } = useTranslation();

  return (
    <DndProvider backend={HTML5Backend}>
      <StyledAppContainer>
        <h1>{translate("title")}</h1>
        <NoteListContainer />
      </StyledAppContainer>
    </DndProvider>
  );
});

export default App;
