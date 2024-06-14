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
  width: 100%;
`;
