import styled, { css } from "styled-components";

export const StyledLink = styled.a`
  background-color: #FFC100;
  padding: 10px;
  justify-content: center;
  border-radius: 0.6rem;
  color: black;
  text-decoration: none;
  font-weight: bold;
  display: flex;
  align-items: center;

  ${({ justifySelf }) =>
    justifySelf &&
    css`
      justify-self: ${justifySelf};
    `}

  ${({ variant }) =>
    variant === "outlined" &&
    css`
      text-align: center;
      background-color: white;
      border: 3px solid #0A1045;
    `}
`;
