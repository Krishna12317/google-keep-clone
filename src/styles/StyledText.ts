import styled from 'styled-components';

export const StyledText = styled.span<{ isSelected: boolean }>`
  text-decoration: ${({ isSelected }) => (isSelected ? 'line-through' : 'none')};
`;
