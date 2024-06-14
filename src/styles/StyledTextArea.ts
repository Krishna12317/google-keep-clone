// import styled from "styled-components";

// export const StyledTextArea = styled.textarea<{ showAddTask: boolean }>`
//   background-color: transparent;
//   font-weight: 500;
//   outline: none;
//   resize: none;
//   height: ${(props) => (props.showAddTask ? "6rem" : "1.5rem")};
// `;

// import styled from "styled-components";

// export const StyledTextArea = styled.textarea<{ showAddTask: boolean }>`
// background - color: transparent;
// font - weight: 500;
// outline: none;
// resize: none;
// height: ${ (props) => (props.showAddTask ? "6rem" : "2.5rem") };
// width: 100 %;
// transition: height 0.5s;
// `;


import styled from "styled-components";

interface StyledTextAreaProps {
  showAddTask: boolean;
}

export const StyledTextArea = styled.textarea.withConfig({
  shouldForwardProp: (prop) => prop !== 'showAddTask',
}) <StyledTextAreaProps>`
  background-color: transparent;
  font-weight: 500;
  outline: none;
  resize: none;
  height: ${(props) => (props.showAddTask ? "6rem" : "1rem")};
  width: 100%;
  transition: height 0.5s;
  padding: 0.5rem;
  border: none;
  border-radius: 0.375rem;
  box-shadow: ${(props) =>
    props.showAddTask ? "0 1px 3px rgba(0, 0, 0, 0.1)" : "none"};
`;

