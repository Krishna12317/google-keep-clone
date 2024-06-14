import styled from "styled-components";

export const StyledNoteList = styled.ul`
  margin: 0px;
  padding: 0px;
`;

export const StyledNoteItem = styled.div<{ color: string }>`
  background-color: ${(props) => props.color};
  padding: 10px;
  width: 200px;
  height: auto;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  position: relative;
`;

export const StyledNoteTitle = styled.h3`
  margin: 0;
  font-size: 1.2em;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const StyledNoteContent = styled.textarea`
  margin: 5px 0 0 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const StyledNoteTextArea = styled.textarea`
  background-color: transparent;
  font-weight: 500;
  outline: none;
  resize: none;
  padding: 0.5rem;
  border: none;
  border-radius: 0.375rem;
  height: 6rem;
  pointer-events: none;
`;

export const StyledPinButton = styled.button`
  position: absolute;
  top: 5px;
  right: 5px;
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 0.8em;
  color: #333;
`;