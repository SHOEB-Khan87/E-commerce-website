import React from 'react'


import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';

import Button from '@mui/material/Button';

import MenuItem from '@mui/material/MenuItem';

import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import { useState } from 'react';
import { useAuth0 } from "@auth0/auth0-react";

const Navbar = (props) => {

  const [anchorElNav, setAnchorElNav] = useState(null)



  const handleOpenNavMenu = (event) => {

    setAnchorElNav(event.currentTarget)
  };

  const handleCloseNavMenu = () => {

    setAnchorElNav(null)
  };


  const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();






  const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      right: -3,
      top: 13,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: '0 4px',

    },
  }));


  const Clear = () => {
    localStorage.clear()
  }

  return (


    <AppBar position="fixed" >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <ShoppingCartIcon sx={{ display: { xs: 'none', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'none' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            E-commerce
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', lg: 'none' } }}>
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
                display: { xs: 'block', lg: 'none' },
              }}
            >

              <MenuItem onClick={handleCloseNavMenu}>
                <Typography textAlign="center"><Link className="link" to="/">Homes</Link></Typography>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <Typography textAlign="center"><Link className='link' to="/electronics">electronics</Link></Typography>
              </MenuItem>

              <MenuItem onClick={handleCloseNavMenu}>
                <Typography textAlign="center"><Link className='link' to="/jewelery">jewelery</Link></Typography>
              </MenuItem>

              <MenuItem onClick={handleCloseNavMenu}>
                <Typography textAlign="center"> <Link className='link' to="/men's%20clothing">men's clothing</Link></Typography>
              </MenuItem>


              <MenuItem onClick={handleCloseNavMenu}>
                <Typography textAlign="center"><Link className='link' to="/women's clothing">women's clothing</Link></Typography>
              </MenuItem>


              <MenuItem onClick={handleCloseNavMenu}>
                <Typography textAlign="center">{isAuthenticated && <p>{user.name}</p>}</Typography>
              </MenuItem>


              {isAuthenticated ? <MenuItem onClick={handleCloseNavMenu}>
                <Typography textAlign="center"><Button style={{ color: "black" }} onClick={() => logout({ returnTo: window.location.origin })}>
                  <Button onClick={Clear}>Log Out</Button>
                </Button>
                </Typography>
              </MenuItem> : <MenuItem onClick={handleCloseNavMenu}>
                <Typography textAlign="center"><Button style={{ color: "black" }} onClick={() => loginWithRedirect()}>Log In</Button></Typography>
              </MenuItem>}





              <MenuItem onClick={handleCloseNavMenu}>
                <Typography textAlign="center"><Link className="link" to="/Cart"><IconButton aria-label="cart">
                  <StyledBadge badgeContent={props.cartState.length === 0 ? "0" : props.cartState.length} color="primary">
                    <ShoppingCartIcon color="secondary" />

                  </StyledBadge>
                </IconButton></Link></Typography>
              </MenuItem>

            </Menu>
          </Box>
          <ShoppingCartIcon sx={{ display: { xs: 'flex', }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            E-commerce
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', lg: 'flex' } }}>

            <Button

              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              <Link className='Link' to="/">Home</Link>
            </Button>
            <Button

              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              <Link className='Link' to="/electronics">electronics</Link>
            </Button>

            <Button

              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              <Link className='Link' to="/jewelery">jewelery</Link>
            </Button>

            <Button

              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              <Link className='Link' to="/men's%20clothing"> men's clothing</Link>
            </Button>

            <Button

              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              <Link className='Link' to="/women's clothing">women's clothing</Link>
            </Button>

            <Typography sx={{ my: 2, color: 'white', display: 'block' }}>{isAuthenticated && <p>{user.name}</p>}</Typography>


            {isAuthenticated ? <Button

              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              <Button onClick={() => logout({ returnTo: window.location.origin })}>
                <Button style={{ color: "white" }} onClick={Clear}>Log Out</Button>
              </Button>
            </Button> : <Button

              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              <Button style={{ color: "white" }} onClick={() => loginWithRedirect()}>Log In</Button>
            </Button>}




            <Button

              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              <Link className='Link' to="/Cart">
                <IconButton aria-label="cart">
                  <StyledBadge badgeContent={props.cartState.length === 0 ? "0" : props.cartState.length} color="primary">
                    <ShoppingCartIcon style={{ color: "white" }} />
                  </StyledBadge>
                </IconButton>
              </Link></Button>


          </Box>


        </Toolbar>
      </Container>
    </AppBar>

  )
}


function mapStateToProps(state) {
  return {
    cartState: state.Cart_Reducer.productCart
  }

}

export default connect(mapStateToProps)(Navbar)

