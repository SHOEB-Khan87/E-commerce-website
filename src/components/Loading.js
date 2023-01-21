import React, { Component } from 'react'
import { Grid } from '@mui/material'
import img from "../Assets/loader.gif"
class Loading extends Component {
  render() {
    return (
      <Grid container style={{ marginTop: "100px" }} justifyContent="center">
        <img src={img} alt="load" />
      </Grid>
    )
  }

}

export default Loading
