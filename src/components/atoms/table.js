import styled from 'styled-components';
import { applyStyleProps } from '../utils';

export const TableCell = styled.td`
  padding: 0;
  position: relative;
  ${(props) => applyStyleProps(props)}
`;
export const TableRow = styled.tr`
  padding: 0;
  vertical-align: top;
  position: relative;
  ${(props) => applyStyleProps(props)}
`;

const Table = styled.table`
  color: white;
  position: relative;
  ${(props) => applyStyleProps(props)}
`;

export default Table;
