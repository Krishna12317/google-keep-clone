import { render, fireEvent } from "@testing-library/react";
import NoteList from "./NoteList";
import { Note } from "./types";

describe("NoteList Component", () => {
  test("should toggle pin when pin button is clicked", () => {
    const mockNote = {
      id: 1,
      title: "Test Note",
      content: "Test Content",
      color: "#ffffff",
      type: "text",
    };

    const togglePinMock = jest.fn();

    const { getByTestId } = render(
      <NoteList
        title="Test"
        notes={[mockNote as Note]}
        setNotes={() => {}}
        togglePin={togglePinMock}
        isPinned={false}
      />
    );

    const pinButton = getByTestId("pin-button"); // Assuming you have a test ID on the pin button
    fireEvent.click(pinButton);

    expect(togglePinMock).toHaveBeenCalledTimes(1);
    expect(togglePinMock).toHaveBeenCalledWith(mockNote);
  });
});
