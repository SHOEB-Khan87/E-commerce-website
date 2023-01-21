import React, { useState } from 'react'

import Popover from '@mui/material/Popover';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { connect } from "react-redux"
import Typography from '@mui/material/Typography';
import { Grid, Button, Box } from '@mui/material';
import Navbar from '../components/Navbar';
import { Add_Cart } from '../Actions';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import Badge from '@mui/material/Badge';
import { Link } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
const Description = (props) => {
  const [counter, setCounter] = useState();
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorEl2, setAnchorEl2] = useState(null)
  const { isAuthenticated } = useAuth0();
  const Add = (data) => {
    if (isAuthenticated) {
      const { onClick } = props;
      onClick(data)
      setCounter(props.cartState)
    } else {

    }



  }


  const handleClick = (event) => {
    if (!isAuthenticated) {
      setAnchorEl2(event.currentTarget)
    } else {
      setAnchorEl(event.currentTarget)
    }



  };

  const handleClose = () => {
    setAnchorEl(null)


  };
  const handleClose2 = () => {
    setAnchorEl2(null)


  };







  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const open2 = Boolean(anchorEl2);
  const id2 = open ? 'simple-popover' : undefined;
  let { image, title, price, rating, description } = props.descState;

  return (
    <>
      <Navbar data={counter} />
      <Grid key={Math.random()} container justifyContent="center">
        {props.descState.length === 0 ? <h1 style={{ marginTop: "100px" }}>add item</h1> :
          <Grid container justifyContent="center" style={{ marginTop: "100px" }}>
            <Card sx={{ width: 345 }}>

              <CardMedia
                component="img"
                height="194"
                image={image}
                alt="green iguana"
                className='card'
              />
              <CardContent style={{ textAlign: "center" }}>
                <Typography gutterBottom variant="h6" component="div">
                  {title}
                </Typography>

                <Typography gutterBottom variant="body2" color="text.secondary">
                  <Badge color='primary' badgeContent={rating.rate} /> &nbsp; &nbsp;<StarBorderIcon color='primary' /> ({rating.count})

                </Typography>
                <Typography gutterBottom variant="body2" color="text.secondary">
                  price : &#36; {price}

                </Typography>

                <Typography gutterBottom variant="body2" color="text.secondary">
                  Description: {description}

                </Typography><br /><br />
                <Box textAlign="center">
                  <Button variant='outlined' size='small' onClick={() => Add(props.descState)} color="primary"><Button aria-describedby={id} onClick={handleClick}>Add To Cart</Button></Button>
                </Box>
              </CardContent>



            </Card>

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


              <Grid item >
                <Typography style={{ textAlign: "center", backgroundColor: "#1976d2", color: "white", borderRadius: "30px", marginTop: "5px" }} gutterBottom variant="h5" color="text.secondary">

                  you have added this product
                </Typography>

                <Card sx={{ width: 200 }} style={{ textAlign: "center", marginLeft: "auto", marginRight: "auto" }}>

                  <CardMedia
                    component="img"
                    height="194"
                    image={image}
                    alt="green iguana"
                  />
                  <CardContent >
                    <Typography gutterBottom variant="h6" component="div">
                      {title}
                    </Typography>

                    <Typography gutterBottom variant="body2" color="text.secondary">
                      <Badge color='primary' badgeContent={rating.rate} /> &nbsp; &nbsp;<StarBorderIcon color='primary' /> ({rating.count})

                    </Typography>
                    <Typography gutterBottom variant="body2" color="text.secondary">
                      price : &#36; {price}

                    </Typography>
                    <br /><br />
                    <Link style={{ textDecoration: "none" }} to="/Cart"><Button variant="outlined">Go To Cart</Button></Link>
                    <br /><br />
                    <Link style={{ textDecoration: "none" }} to="/"> <Button size="small" variant="outlined" onClick={handleClose}>Continue Shopping</Button></Link>


                  </CardContent>



                </Card>
              </Grid>

            </Popover>
            <Popover
              style={{ height: "150px" }}
              id={id2}
              open={open2}
              anchorEl={anchorEl2}
              onClose={handleClose2}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
            > <Typography sx={{ p: 2 }}>please sign up</Typography></Popover>

          </Grid>}
      </Grid>
    </>
  )
}


function mapStateToProps(state) {
  return {
    descState: state.desc_Reducer.descCart,
    cartState: state.Cart_Reducer.productCart
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onClick: (data) => dispatch(Add_Cart(data)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Description)

