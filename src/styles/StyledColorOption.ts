import styled from "styled-components";

interface StyledColorOptionProps {
  color: string;
  isSelected: boolean;
}

export const StyledColorOption = styled.li.withConfig({
  shouldForwardProp: (prop) => !['color', 'isSelected'].includes(prop)
}) <StyledColorOptionProps>`
  list-style: none;
  margin: 0.25rem;
  width: 1.75rem;
  height: 1.75rem;
  border: 2px solid ${(props) => (props.isSelected ? "#334155" : "#f1f5f9")};
  border-radius: 50%;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  background-color: ${(props) => props.color};

  &:hover {
    border-color: #334155;
  }
`;

