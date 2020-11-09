import React from 'react';
import styled from 'styled-components';

export const Button = styled.button`
  padding: 5px 16px;
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  vertical-align: middle;
  cursor: pointer;
  border: 1px solid;
  border-radius: 6px;
`;

export const GreenButton = styled(Button)`
  color: white;
  background-color: #2ea44f;
  border-color: rgba(27, 31, 35, 0.15);
`;

export const GrayButton = styled(Button)`
  color: black;
  background-color: #f5f5f5;
  border-color: rgba(27, 31, 35, 0.15);
`;
