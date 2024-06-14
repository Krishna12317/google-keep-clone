import styled from "styled-components";
import { MdAdd } from "react-icons/md";

export const StyledTodoContainer = styled.div`
  margin: 20px auto;
  font-family: "Roboto", sans-serif;
`;

export const StyledSection = styled.div`
  margin-bottom: 20px;
`;

export const StyledHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
`;

export const StyledToggleButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  color: #757575;
`;

export const StyledInputContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  background-color: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
`;

export const StyledTodoInput = styled.input`
  flex: 1;
  padding: 10px;
  border: none;
  outline: none;
  font-size: 16px;
  color: #333;
  ::placeholder {
    color: #757575;
  }
`;

export const StyledAddIcon = styled(MdAdd)`
  cursor: pointer;
  color: #757575;
  font-size: 24px;
  margin-right: 10px;
`;

export const StyledExpandIcon = styled.div`
  margin-right: 10px;
`;