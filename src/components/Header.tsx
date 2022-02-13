import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Link from '@mui/material/Link';
import { useLocalStorage } from 'usehooks-ts';
import { UserData } from './fakeApi';

export default function Header() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null,
  );
  const [userData, setUserData] = useLocalStorage<UserData | null>(
    'user',
    null,
  );

  function handleLogoutClick() {
    setAnchorElNav(null);
    setUserData(null);
  }

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position='static'>
      <Container maxWidth='xl'>
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton onClick={handleOpenNavMenu} color='inherit'>
              <MenuIcon />
            </IconButton>
            <Menu
              id='menu-appbar'
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {!userData?.accessToken ? (
                <>
                  <Link href='/login' underline='none'>
                    <MenuItem onClick={handleCloseNavMenu}>LogIn</MenuItem>
                  </Link>
                  <Link href='/register' underline='none'>
                    <MenuItem onClick={handleCloseNavMenu}>Register</MenuItem>
                  </Link>
                </>
              ) : (
                <Link underline='none'>
                  <MenuItem onClick={handleLogoutClick}>Log out</MenuItem>
                </Link>
              )}

              {userData?.roles.includes('admin') && (
                <Link href='/register' underline='none'>
                  <MenuItem onClick={handleCloseNavMenu}>Analytics</MenuItem>
                </Link>
              )}
            </Menu>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {!userData?.accessToken ? (
              <>
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                  href='/login'
                >
                  Login
                </Button>
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                  href='/register'
                >
                  Register
                </Button>
              </>
            ) : (
              <Button
                onClick={handleLogoutClick}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                Log out
              </Button>
            )}

            {userData?.roles.includes('admin') && (
              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
                href='/analytics'
              >
                Analytics
              </Button>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
