import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import {
  Box,
  Grid,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
  Button,
  Tooltip,
  MenuItem
} from '@mui/material';
import PedalBikeIcon from '@mui/icons-material/PedalBike';
import MenuIcon from '@mui/icons-material/Menu';
import { Outlet, Link } from 'react-router-dom';
import useHeader from '../../hooks/useHeader';
import useUser from '../../hooks/useUser';
import { useTranslation } from "react-i18next"

function Header() {
  const [t, i18n] = useTranslation("global")

  const {
    anchorElNav,
    anchorElUser,
    handleOpenNavMenu,
    handleOpenUserMenu,
    handleCloseNavMenu,
    handleCloseUserMenu,
    pagesLogged,
    pagesNoLogged,
    settings
  } = useHeader();

  const { isLogged, user, logout, amount } = useUser();

console.log(amount)
  const logoutClick = (event) => {
    handleCloseUserMenu();
    logout();
  };
  return (
    <>
      <AppBar position="static" color="primary">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}>
              MontyBici
            </Typography>
            <Typography
              variant="small"
              noWrap
              component="div"
              sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
              onClick={() => { i18n.changeLanguage("en") }}              >
              En

            </Typography>
            <Typography
              variant="small"
              noWrap
              component="div"
              sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
              onClick={() => { i18n.changeLanguage("es") }}              >
              Es
            </Typography>

            <Typography
              variant="small"
              noWrap
              component="div"
              sx={{ mr: 5, display: { xs: 'none', md: 'flex' } }}
              onClick={() => { i18n.changeLanguage("kl") }}>
              Klingon
            </Typography>


            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left'
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left'
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' }
                }}
              >
                {isLogged
                  ? pagesLogged.map((page) => (
                    <MenuItem key={page} onClick={handleCloseNavMenu}>
                      <Typography textAlign="center">
                        <Link className="nav-link " to={`/${page}`}>
                          {page}
                        </Link>

                      </Typography>
                    </MenuItem>
                  ))


                  : pagesNoLogged.map((page) => (
                    <MenuItem key={page} onClick={handleCloseNavMenu}>
                      <Typography textAlign="center">
                        <Link className="nav-link " to={`/${page}`}>
                          {page}
                        </Link>
                      </Typography>
                    </MenuItem>
                  ))}
              </Menu>
            </Box>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
            >
              MontyBici
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {isLogged
                ? pagesLogged.map((page) => (
                  <Button
                    key={page}
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                  >
                    <Link className="nav-link text-white" to={`/${page}`}>
                      {page}
                    </Link>
                  </Button>
                ))
                : pagesNoLogged.map((page) => (
                  <Button
                    key={page}
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                  >
                    <Link className="nav-link text-white" to={`/${page}`}>
                      {page}
                    </Link>
                  </Button>
                ))}
            </Box>

            {isLogged && (
              <>

                <Box sx={{ flexGrow: 0 }}>
                  <Grid item xs >
                    <Typography noWrap>{(amount || "0,00").split("").reverse().join("").replace(".", ",").split("").reverse().join("")}€</Typography>
                  </Grid>
                </Box>


                {user.profile.registers && (
                  <Box
                    variant="h6"
                    noWrap
                    component="div"
                    sx={{ mr: 2, display: { xs: 'flex', md: 'flex' } }}
                  >
                    <Grid item xs zeroMinWidth>
                      <Typography noWrap>
                        <PedalBikeIcon />
                      </Typography>
                      <Typography noWrap>
                        {user.profile.registers.station}
                      </Typography>
                    </Grid>

                  </Box>
                )}
                <Box sx={{ flexGrow: 0 }}>
                  <Grid item xs zeroMinWidth>
                    <Tooltip title="Open settings">
                      <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                        <Avatar
                          alt={user.username.toUpperCase()}
                          title={user.username}
                          src={`https://avatars.dicebear.com/api/avataaars/${user.username}.svg`}
                        />
                      </IconButton>
                    </Tooltip>
                    <Typography noWrap>{user.username}</Typography>
                  </Grid>

                  <Menu
                    sx={{ mt: '45px' }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right'
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right'
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                  >
                    {settings.map((setting) => (
                      <MenuItem key={setting} onClick={handleCloseUserMenu}>
                        <Link
                          className="nav-link text-white"
                          to={`/${setting}`}
                        >
                          <Typography textAlign="center" color="common.black">
                            {setting}
                          </Typography>
                        </Link>
                      </MenuItem>
                    ))}
                    <MenuItem key="Logout" onClick={logoutClick}>
                      <Link className="nav-link text-white" to="">
                        <Typography textAlign="center" color="common.black">
                          Logout
                        </Typography>
                      </Link>
                    </MenuItem>
                  </Menu>
                </Box>
              </>
            )}
          </Toolbar>
        </Container>
      </AppBar>
      <Outlet />
    </>
  );
}

export default Header;
