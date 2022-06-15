import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material'
import React from 'react'
import casio1 from '../../../../assets/images/casio1.png'

const CardItem = () => {
  return (
    <>
      <Card sx={{ maxWidth: 345, marginX: 'auto' }}>
        <CardMedia
          component="img"
          height="140"
          image={casio1}
          alt="jam tangan"
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            Jam Tangan Casio
          </Typography>
          <Typography gutterBottom variant="body1" color="text.secondary">
            Aksesoris
          </Typography>
          <Typography variant="h6" component="div">
            Rp. 250.000
          </Typography>
        </CardContent>
      </Card>
    </>
  )
}

export default CardItem