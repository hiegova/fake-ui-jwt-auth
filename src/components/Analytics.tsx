import { Container, LinearProgress, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import Chart, { RawData } from './Chart';
import DataTable from './DataTable';
import Header from './Header';
import { getRandomDataList, UserData } from './fakeApi';
import { useLocalStorage } from 'usehooks-ts'
import { Navigate } from 'react-router-dom';
import { LoadStatus } from './SignIn';

export default function Analytics() {
  const [chartData, setChartData] = useState<RawData[] | null>(null);
  const [userData, setUserData] = useLocalStorage<UserData | null>('user', {} as UserData)
  const [loadStatus, setLoadStatus] = useState<LoadStatus>('idle');

  useEffect(() => {
    async function fetchData() {
      const { status, data } = await getRandomDataList(userData!.username, userData!.accessToken);

      if (status === 200) {
        setLoadStatus('succeeded');
        setChartData(data || null);
      }

      if (status === 401) {
        setLoadStatus('failed');
        setUserData(null);
      }
    }

    if (userData && loadStatus === 'idle') {
      fetchData();
    }
  }, [userData, loadStatus, setUserData]);

  if (!userData?.accessToken) {
    return <Navigate to='/login' />
  }

  return (
    <>
      <Header />
      <Container component='main' maxWidth='md'>
        <Chart rawData={chartData} />
        <Typography
          variant='h4'
          align='center'
          gutterBottom
          sx={{ marginTop: 5 }}
        >
          List Of Data
        </Typography>
        {!chartData && <LinearProgress />}
        <DataTable data={chartData} />
      </Container>
    </>
  );
}
