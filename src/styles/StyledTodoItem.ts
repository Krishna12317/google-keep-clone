import styled from "styled-components";
import { MdDelete } from "react-icons/md";

export const StyledItemContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  background-color: #fff;
  border-bottom: 1px solid #e0e0e0;
`;

export const StyledCheckboxIcon = styled.div`
  margin-top: 8px;
  margin-right: 10px;
  cursor: pointer;
`;

export const StyledTodoItemInput = styled.input<{ checked: boolean }>`
  flex: 1;
  padding: 10px;
  border: none;
  outline: none;
  font-size: 16px;
  color: ${(props) => (props.checked ? "#757575" : "#333")};
  text-decoration: ${(props) => (props.checked ? "line-through" : "none")};
  background-color: transparent;
`;

export const StyledDeleteIcon = styled(MdDelete)`
  margin-left: 10px;
  cursor: pointer;
  color: #757575;
  font-size: 20px;
`;
