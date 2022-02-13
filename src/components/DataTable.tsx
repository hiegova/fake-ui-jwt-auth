import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Skeleton } from '@mui/material';
import { RawData } from './Chart';

interface DataTableProps {
  data: RawData[] | null;
}

interface DataTableBodyProps extends DataTableProps {}

export function Placeholder({ numOfRows }: { numOfRows: number }) {
  const rows = new Array(numOfRows).fill(null);

  return (
    <TableBody>
      {rows.map((_, i) => (
        <TableRow key={i}>
          <TableCell component='th' scope='row'>
            <Skeleton variant='text' />
          </TableCell>
          <TableCell component='th' scope='row'>
            <Skeleton variant='text' />
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
}

function DataTableBody(props: DataTableBodyProps) {
  const { data } = props;

  if (!data?.length) {
    return <Placeholder numOfRows={10} />;
  }

  return (
    <TableBody>
      {data.map((d) => (
        <TableRow key={d.month}>
          <TableCell>{d.month}</TableCell>
          <TableCell component='th' scope='row'>
            {d.value}
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
}

export default function DataTable(props: DataTableProps) {
  const { data } = props;

  return (
    <TableContainer component={Paper} sx={{ maxHeight: 440 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Month</TableCell>
            <TableCell>Value</TableCell>
          </TableRow>
        </TableHead>
        <DataTableBody data={data} />
      </Table>
    </TableContainer>
  );
}
