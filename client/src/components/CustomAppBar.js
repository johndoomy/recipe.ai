import { useState } from 'react';
import { userApi } from '../store/apis/userApi';
import { useDispatch } from 'react-redux';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';
import { Link, useLocation } from 'react-router-dom';

export default function CustomAppBar({ loading, authenticated, name }) {
  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(0);

  let location = useLocation();
  let title = 'Recipe.AI';
  if (location.pathname === '/featured_recipes') {
    title = 'Featured Recipes';
  }
  if (location.pathname === '/saved_recipes') {
    title = 'Saved Recipes';
  }

  const handleSelect = (num) => {
    if (!authenticated) {
      setSelected(4);
    } else {
      setSelected(num);
    }
  };

  const toggleDrawer = (bool) => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }
    setIsOpen(bool);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    dispatch(userApi.util.invalidateTags(['User']));
    console.log('logging out');
  };

  let userIcon;
  if (loading) {
    userIcon = 'loading';
  } else if (authenticated) {
    userIcon = (
      <IconButton>
        <Avatar>{Array.from(name)[0]}</Avatar>
      </IconButton>
    );
  } else {
    userIcon = (
      <Button onClick={() => setIsOpen(false)} color="inherit">
        <Link to="/login" style={{ textDecoration: 'none', color: 'white' }}>
          Login
        </Link>
      </Button>
    );
  }

  let bottomLinks;
  if (authenticated) {
    bottomLinks = (
      <List>
        <Link style={{ textDecoration: 'none', color: 'black' }} to="/login">
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => {
                handleLogout();
                handleSelect(4);
              }}
            >
              <ListItemText primary="Log Out" />
            </ListItemButton>
          </ListItem>
        </Link>
      </List>
    );
  } else {
    bottomLinks = (
      <List>
        <Link style={{ textDecoration: 'none', color: 'black' }} to="/login">
          <ListItem disablePadding>
            <ListItemButton selected={selected === 4 || !authenticated}>
              <ListItemText primary="Log In" />
            </ListItemButton>
          </ListItem>
        </Link>
        <Link style={{ textDecoration: 'none', color: 'black' }} to="/register">
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemText primary="Register" />
            </ListItemButton>
          </ListItem>
        </Link>
      </List>
    );
  }

  return (
    <>
      <Box position="sticky" sx={{ zIndex: 1500, flexGrow: 1 }}>
        <AppBar>
          <Toolbar>
            <Grid
              container
              alignItems="center"
              sx={{ justifyContent: 'space-between' }}
            >
              <Grid>
                <>
                  <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                    onClick={toggleDrawer(!isOpen)}
                  >
                    <MenuIcon />
                  </IconButton>
                </>
              </Grid>
              <Grid>
                <Typography>{title}</Typography>
              </Grid>
              <Grid>{userIcon}</Grid>
            </Grid>
          </Toolbar>
        </AppBar>
      </Box>
      <SwipeableDrawer
        anchor="left"
        open={isOpen}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      >
        <Box
          sx={{
            mt: 8,
            width: 250,
          }}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <List>
            <Link
              style={{
                textDecoration: 'none',
                color: 'black',
              }}
              to={authenticated ? '/' : '/login'}
            >
              <ListItem disablePadding>
                <ListItemButton
                  selected={selected === 0}
                  onClick={() => {
                    handleSelect(0);
                  }}
                >
                  <ListItemText primary="Generate Recipes" />
                </ListItemButton>
              </ListItem>
            </Link>
            <Link
              style={{ textDecoration: 'none', color: 'black' }}
              to={authenticated ? '/saved_recipes' : '/login'}
            >
              <ListItem disablePadding>
                <ListItemButton
                  selected={selected === 1}
                  onClick={() => {
                    handleSelect(1);
                  }}
                >
                  <ListItemText primary="Saved Recipes" />
                </ListItemButton>
              </ListItem>
            </Link>
            <Link
              style={{ textDecoration: 'none', color: 'black' }}
              to={authenticated ? '/featured_recipes' : '/login'}
            >
              <ListItem disablePadding>
                <ListItemButton
                  selected={selected === 2}
                  onClick={() => handleSelect(2)}
                >
                  <ListItemText primary="Featured Recipes" />
                </ListItemButton>
              </ListItem>
            </Link>
          </List>
          <Box sx={{ position: 'absolute', bottom: 20, width: 250 }}>
            <Divider />
            {bottomLinks}
            <Link
              style={{ textDecoration: 'none', color: 'black' }}
              to="/about"
            >
              <ListItem disablePadding>
                <ListItemButton
                  selected={selected === 5}
                  onClick={() => handleSelect(5)}
                >
                  <ListItemText primary="About" />
                </ListItemButton>
              </ListItem>
            </Link>
          </Box>
        </Box>
      </SwipeableDrawer>
    </>
  );
}
