import React, { useState, useEffect, Component } from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, Grid, Box, TextField } from '@mui/material';
import { Increment, Decrement } from '../Actions';
import { Remove_Product } from '../Actions';
import { connect } from "react-redux"
import Navbar from '../components/Navbar';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import Badge from '@mui/material/Badge';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';


import { Link } from 'react-router-dom';
class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = { count: 0, address: this.getAddress() }
  }



  getAddress = () => {
    let data = localStorage.getItem("address");
    if (data) {
      return JSON.parse(localStorage.getItem("address"));
    }
  }

  handleClick = () => {

    if (!this.state.address) {

    } else {
      localStorage.setItem("address", JSON.stringify(this.state.address))
    }




  };



  Remove = (data) => {
    this.props.Remove_Product(data)
  }

  increment = (data) => {
    this.props.Increment(data)
    this.setState({ count: this.state.count + 1 })


  }

  decrement = (data) => {
    this.props.Decrement(data)
    this.setState({ count: this.state.count - 1 })


  }

  handleChange = (event) => {
    this.setState({ address: event.target.value })

  }



  render() {
    return (
      <>

        <Navbar />


        {this.props.cartState.length === 0 ? <h1 style={{ marginTop: "100px", textAlign: "center" }}>Add items to cart</h1> : <Grid container spacing={2} justifyContent="center">
          {this.props.cartState.map(elem => {
            return <Grid key={elem.id} item xs={12} sm={6} md={4} lg={3} style={{ marginTop: "100px" }}>

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
                      <Button startIcon={<AddCircleOutlineIcon />} disabled={elem.quantity === 5} onClick={() => this.increment(elem)}></Button> {elem.quantity} <Button startIcon={<RemoveCircleOutlineIcon />} disabled={elem.quantity === 1} onClick={() => this.decrement(elem)}></Button>

                    </Typography>
                    <br /><br />
                    <Box textAlign='center'>
                      <Button onClick={() => this.Remove(elem)}>Remove Product</Button>
                    </Box>

                  </CardContent>

                </Box>

              </Card>
            </Grid>
          })}


        </Grid>}{this.props.cartState.length === 0 ? " " : <TextField value={this.state.address} onChange={this.handleChange} label="Add Your Address" variant='outlined' style={{ marginTop: "80px" }} />}
        {this.props.cartState.length === 0 ? "" : <Box style={{ marginTop: "40px" }}>
          {!this.state.address ? <Button size="small"  ><Button color="success" variant="contained" onClick={this.handleClick}>

            Place Order  </Button></Button> : <Button size="small"  ><Button color="success" variant="contained" onClick={this.handleClick}>

              <Link style={{ textDecoration: "none", color: "white" }} to="/Address">Place Order </Link>   </Button></Button>}
        </Box>}
        {this.props.cartState.length === 0 ? <Box textAlign="center">
          <Button color='primary' variant='contained'><Link style={{ textDecoration: "none", color: "white" }} to="/">Shop now</Link></Button>
        </Box> : ""}

      </>
    )
  }

}


function mapStateToProps(state) {
  return {
    cartState: state.Cart_Reducer.productCart,
    descState: state.desc_Reducer.descCart,
  }
}


export default connect(mapStateToProps, { Remove_Product, Increment, Decrement })(Cart)

