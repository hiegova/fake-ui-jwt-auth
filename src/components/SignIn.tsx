import { FormEvent, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Header from './Header';
import { useLocalStorage } from 'usehooks-ts';
import { login, UserData } from './fakeApi';
import { Navigate } from 'react-router-dom';
import { CircularProgress } from '@mui/material';

export type LoadStatus = 'idle' | 'loading' | 'succeeded' | 'failed';

export default function SignIn() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userData, setUserData] = useLocalStorage<UserData | null>('user', null);
  const [loadStatus, setLoadStatus] = useState<LoadStatus>('idle');

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoadStatus('loading');

    const { status, data } = await login(username, password);

    if (status !== 200) {
      setLoadStatus('failed');
      return;
    }

    setLoadStatus('succeeded');
    setUserData(data || null);
  };

  if (userData?.accessToken) {
    return <Navigate to='/analytics' />;
  }

  return (
    <>
      <Header />
      <Container component='main' maxWidth='xs'>
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component='h1' variant='h5'>
            Sign in
          </Typography>
          <Box
            component='form'
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin='normal'
              required
              fullWidth
              id='username'
              label='Username'
              name='username'
              autoComplete='username'
              autoFocus
              onChange={(event) => setUsername(event.currentTarget.value)}
              error={loadStatus === 'failed'}
              disabled={loadStatus === 'loading'}
            />
            <TextField
              margin='normal'
              required
              fullWidth
              name='password'
              label='Password'
              type='password'
              id='password'
              autoComplete='current-password'
              onChange={(event) => setPassword(event.currentTarget.value)}
              error={loadStatus === 'failed'}
              disabled={loadStatus === 'loading'}
            />
            <Button
              type='submit'
              fullWidth
              variant='contained'
              sx={{ mt: 3, mb: 2 }}
              disabled={loadStatus === 'loading'}
            >
              {loadStatus === 'loading' ? (
                <CircularProgress sx={{ color: 'white' }} size={25} />
              ) : 'Sign In'}
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
}
