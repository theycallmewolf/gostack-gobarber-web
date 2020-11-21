import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.button`
  width: 100%;
  height: 56px;
  background: #ff9000;
  border-radius: 10px;
  border: 0;
  padding: 0 16px;
  color: #312e38;
  font-weight: 500;
  margin-top: 16px;
  transition: background-color 200ms ease-in-out;

  &:hover {
    background: ${shade(0.2, '#ff9000')};
  }
`;
