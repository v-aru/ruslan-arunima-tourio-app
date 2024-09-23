import styled, { css } from "styled-components";

export const StyledButton = styled.button`
  background-color: #FFC100;
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
      background-color: firebrick;
      color: white;
    `}
`;
