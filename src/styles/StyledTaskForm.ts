// import styled from "styled-components";

// export const StyledTaskForm = styled.form<{ showAddTask: boolean; colorTask: string }>`
//   display: flex;
//   justify-content: space-between;
//   width: 100%;
//   max-width: 60%;
//   background-color: ${(props) => props.colorTask || "#f1f5f9"};
//   border-radius: 0.375rem;
//   box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
//   padding: 0.75rem;
//   flex-direction: ${(props) => (props.showAddTask ? "column" : "row")};
//   gap: ${(props) => (props.showAddTask ? "0.75rem" : "0")};
// `;

// import styled from "styled-components";

// export const StyledTaskForm = styled.form<{ showAddTask: boolean; colorTask: string }>`
//   background-color: ${(props) => props.colorTask || "#f1f5f9"};
//   border-radius: 0.375rem;
//   width: 100%;
//   max-width: 600px;
//   padding: ${(props) => (props.showAddTask ? "1.5rem" : "0.5rem 1rem")};
//   box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
//   transition: all 0.5s ease;
//   border: 1px solid #e2e8f0;
// `;


import styled from "styled-components";

interface StyledTaskFormProps {
  showAddTask: boolean;
  colorTask: string;
}

export const StyledTaskForm = styled.form.withConfig({
  shouldForwardProp: (prop) => !['showAddTask', 'colorTask'].includes(prop)
}) <StyledTaskFormProps>`
  display: flex;
  flex-direction: ${(props) => props.showAddTask ? "column" : "row"};
  background-color: ${(props) => props.colorTask || "#fff"};
  padding: 1rem;
  border-radius: 0.375rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;
