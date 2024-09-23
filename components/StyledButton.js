import styled, { css } from "styled-components";

export const StyledButton = styled.button`
  background-color: #7FBEEB;
  padding: 0.5rem;
  border-radius: 0.6rem;
  color: black;
  text-decoration: none;
  font-weight: bold;
  border: none;
  font-size: inherit;
  cursor: pointer;
  width: fit;

  ${({ variant }) =>
    variant === "delete" &&
    css`
      background-color: #E74C3C;
      color: white;
      border: none;
      padding: 10px 20px;
      border-radius: 0.4rem;
      
      &:hover {
        background-color: #c0392b;
      }
    `}
`;
