import {
  TableContainer,
  Table as MuiTable,
  Paper,
  TableBody,
  TableRow,
  TableCell,
  Typography,
  BoxProps,
  Box,
} from '@mui/material';

export type TInfoTableRow = {
  key: string;
  value: string | number;
};

type TInfoTable = {
  header: string;
  rows: TInfoTableRow[];
} & BoxProps;

function InfoTable({ header, rows, ...boxProps }: TInfoTable) {
  return (
    <Box {...boxProps}>
      <Typography variant="h5" textAlign="left" marginBottom="16px">
        {header}
      </Typography>
      <TableContainer component={Paper}>
        <MuiTable sx={{ minWidth: { sm: 650 } }} aria-label="table">
          <TableBody>
            {rows.map(({ key, value }, index) => (
              // using indexes for keys isn't ideal but only option here since the
              // policyHolder data doesnt contain IDs
              <TableRow key={`${key}-${index}`}>
                <TableCell>{key}</TableCell>
                <TableCell sx={{ whiteSpace: 'pre' }}>{value}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </MuiTable>
      </TableContainer>
    </Box>
  );
}
export default InfoTable;
