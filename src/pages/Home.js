import React, { Component } from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';

import { Set_Products, Desc_Cart } from '../Actions';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Loading from "../components/Loading"
import Navbar from '../components/Navbar';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import Badge from '@mui/material/Badge';
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: true };
  }

  api = process.env.REACT_APP_API;
  anotherApi = process.env.REACT_APP_SECONDAPI;
  fetchData = async () => {
    if (this.props.home) {
      this.setState({ loading: true })
      let data = await fetch(`${this.api}${this.props.home}`);
      let store = await data.json();
      store && store.length !== 0 ? this.props.Set_Products(store) : this.props.Set_products("please wait")
      this.setState({ loading: false })
    } else if (this.props.category) {
      this.setState({ loading: true })
      let data = await fetch(`${this.anotherApi}${this.props.category}`);
      let store = await data.json();
      store && store.length !== 0 ? this.props.Set_Products(store) : this.props.Set_products("please wait")
      this.setState({ loading: false })
    } else {

    }

  }

  componentDidMount() {
    this.fetchData()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.home !== this.props.home) {
      this.fetchData();
    } else if (prevProps.category !== this.props.category) {
      this.fetchData();
    }
  }

  AddtoDecs = (data) => {
    this.props.Desc_Cart(data)

  }



  render() {

    return (
      <>
        <Navbar />
        {this.state.loading && <Loading />}
        {!this.state.loading && <Grid spacing={2} container justifyContent="center">
          {this.props.mainState && this.props.mainState.map(elem => {
            return <Grid key={elem.id} item xs={12} sm={6} md={4} lg={3}>

              <Link style={{ textDecoration: "none" }} to="/Description" onClick={() => this.AddtoDecs(elem)}>
                <Grid container justifyContent="center" style={{ marginTop: "100px" }}>
                  <Card className="card" sx={{ width: 345 }}>

                    <CardMedia
                      component="img"
                      height="194"
                      image={elem.image}
                      alt="Home"

                    />
                    <CardContent style={{ textAlign: "center" }}>
                      <Typography gutterBottom variant="h6" component="div">
                        {elem.title}
                      </Typography>

                      <Typography gutterBottom variant="body2" color="text.secondary">
                        <Badge color='primary' badgeContent={elem.rating.rate} /> &nbsp; &nbsp;<StarBorderIcon color='primary' /> ({elem.rating.count})

                      </Typography>
                      <Typography gutterBottom variant="body2" color="text.secondary">
                        price : &#36; {elem.price}

                      </Typography>

                    </CardContent>

                  </Card>
                </Grid>
              </Link>

            </Grid>
          })}
        </Grid>}</>
    )
  }
}

function mapStateToProps(state) {
  return {
    mainState: state.Set_reducer.products,
    cartState: state.Cart_Reducer.productCart
  }
}

export default connect(mapStateToProps, { Set_Products, Desc_Cart })(Home)