import styled from 'styled-components';

export const CheckWrapper = styled.div`
  visibility: ${(props) => props.checked ? 'visible': 'hidden'};
`;
