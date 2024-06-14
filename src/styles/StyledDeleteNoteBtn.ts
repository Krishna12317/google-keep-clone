import styled from "styled-components";

export const StyledDeleteButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  position: absolute;
  bottom: 8px; /* Adjust as needed */
  right: 8px; /* Adjust as needed */
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;

  svg {
    color: #d32f2f; // Example color, you can change it as per your design
    width: 24px; /* Adjust icon size as needed */
    height: 24px;
  }

  &:hover {
    svg {
      color: #b71c1c; // Darker color on hover
    }
  }
`;
