import React from 'react'
import { useState } from 'react'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useAuth0 } from "@auth0/auth0-react";
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import LooksOneIcon from '@mui/icons-material/LooksOne';
import { Grid, Typography, Card, CardMedia, Box, CardContent, Badge, Button } from '@mui/material';
import LooksTwoIcon from '@mui/icons-material/LooksTwo';
import CheckIcon from '@mui/icons-material/Check';
import Looks3Icon from '@mui/icons-material/Looks3';
import { connect } from 'react-redux';
import Popover from '@mui/material/Popover';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { Remove_Product, Increment, Decrement } from '../Actions';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';
const Address = (props) => {
  const getAddress = () => {
    let data = localStorage.getItem("address");
    if (data) {
      return JSON.parse(localStorage.getItem("address"));
    }
  }
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [address, setAddress] = useState(getAddress())
  const { isAuthenticated, user } = useAuth0();
  const [count, setCount] = useState(0);
  const Remove = (data) => {
    props.Remove_Product(data)
  }

  const increment = (data) => {
    props.Increment(data)
    setCount(count + 1)

  }

  const decrement = (data) => {
    props.Decrement(data)
    setCount(count - 1)

  }

  const handleClick = (event) => {

    setAnchorEl(event.currentTarget);


  };
  const handleClose = () => {

    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  return (
    <>
      <Navbar />
      <div style={{ marginTop: "110px", backgroundColor: "#e4ede6", padding: "10px", borderRadius: "10px" }}>
        <Typography style={{ display: "flex", color: "#52b8f2" }} ><LooksOneIcon color='primary' />&nbsp; LOGIN  &nbsp;<CheckIcon color='primary' fontSize="small" /> </Typography>
        <Typography style={{ textIndent: "35px", color: "#52b8f2" }}>{isAuthenticated && <Typography>{user.name}</Typography>}</Typography>
      </div>
      <div style={{ marginTop: "10px", backgroundColor: "#e4ede6", padding: "5px", borderRadius: "10px" }}>
        <Typography style={{ display: "flex", color: "#52b8f2", alignItems: "center" }} ><LooksTwoIcon color='primary' /><Typography>&nbsp;DELIVERY ADDRESS </Typography><CheckIcon color='primary' fontSize="small" /> </Typography>
        {props.cartState.length === 0 ? " " : <Typography style={{ textIndent: "30px", color: "#52b8f2" }}>{address} <Link style={{ textDecoration: "none", display: "flex", justifyContent: "end" }} to="/Cart"><Button size="small" variant='contained'>Change</Button></Link></Typography>}
      </div>
      <div style={{ marginTop: "10px", backgroundColor: "#e4ede6", padding: "5px", borderRadius: "10px" }}>
        <Typography style={{ display: "flex", color: "#52b8f2", alignItems: "center" }} ><Looks3Icon color='primary' /><Typography>  &nbsp;ORDER SUMMARY </Typography>  &nbsp;<CheckIcon color='primary' fontSize="small" /> </Typography>
      </div>
      {props.cartState.length === 0 ? <h1 style={{ marginTop: "30px", textAlign: "center" }}>Your checkout has no item</h1> : <Grid container spacing={2} justifyContent="center">
        {props.cartState.map(elem => {
          return <Grid key={elem.id} item xs={12} sm={6} md={4} lg={3} style={{ marginTop: "20px" }}>

            <Card sx={{ width: "100%" }}>
              <CardMedia
                component="img"
                sx={{ height: 250 }}
                image={elem.image}
                alt="Live from space album cover"
              />
              <Box>
                <CardContent style={{ textAlign: "center" }}>

                  <Typography gutterBottom variant="h6" component="div">
                    {elem.title}
                  </Typography>

                  <Typography gutterBottom variant="body2" color="text.secondary">
                    <Badge color='primary' badgeContent={elem.rating.rate} /> &nbsp; &nbsp;<StarBorderIcon color='primary' /> ({elem.rating.count})

                  </Typography>
                  <Typography gutterBottom variant="body2" color="text.secondary">
                    price: &#36; {elem.quantity * elem.price}

                  </Typography>
                  <Typography gutterBottom variant="body2" color="text.secondary">
                    <Button startIcon={<AddCircleOutlineIcon />} disabled={elem.quantity === 5} onClick={() => increment(elem)}></Button> {elem.quantity} <Button startIcon={<RemoveCircleOutlineIcon />} disabled={elem.quantity === 1} onClick={() => decrement(elem)}></Button>

                  </Typography>
                  <br /><br />
                  <Box textAlign='center'>
                    <Button onClick={() => Remove(elem)}>Remove Product</Button>
                  </Box>

                </CardContent>

              </Box>

            </Card>
          </Grid>
        })}


      </Grid>}
      {props.cartState.length === 0 ? "" : <Box textAlign="end" style={{ backgroundColor: "#e4ede6", marginTop: "20px", padding: "10px", color: "#52b8f2" }}>
        <Typography style={{ display: "flex", justifyContent: "space-around", transform: "" }}> Order confirmation will be given with a popup <Button size="small" variant='contained' aria-describedby={id} onClick={handleClick}>Click</Button></Typography>
      </Box>}
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Typography style={{ textAlign: "center" }} sx={{ p: 2 }}>your order will be delivered in a week</Typography>
      </Popover>
    </>
  )
}


function mapStateToProps(state) {
  return {
    cartState: state.Cart_Reducer.productCart
  }
}

export default connect(mapStateToProps, { Remove_Product, Increment, Decrement })(Address)
