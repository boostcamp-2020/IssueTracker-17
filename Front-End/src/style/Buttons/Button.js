import styled from 'styled-components';

export const Button = styled.button`
  padding: 5px;
  font-size: 16px;
  margin: 2px;
  font-weight: bolder;
  line-height: 20px;
  width: fit-content;
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

export const LabelMilestoneButton = styled(Button)`
  background-color: ${(props) => (props.color ? props.color : 'white')};
  color: ${(props) => (props.color ? 'white' : 'black')};
  height: 33px;
  border: 1px solid darkgray;
  border-radius: 7px !important;
  font-size: 16px;
  font-weight: bold;
  padding: 0px;
  margin: 0px;
  width: 150px;
`;
