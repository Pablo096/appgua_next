import { Divider, Typography, Select, MenuItem, Grid, Box } from '@mui/material'
import type { NextPage } from 'next'
import { LayoutPrincipal } from '../components'
import styles from '../styles/Home.module.css'
 
const Home: NextPage = () => {
  return (
    <LayoutPrincipal >
      <Grid container style={{width: 400}}  spacing={2}>
        <Grid item xs={12}>
          <Typography variant='h1' component='h1'>Nombre</Typography>
          <Divider />
        </Grid>
        <Grid item xs={6}>
        <Typography variant='h6'>Producto</Typography>
        <Select
          label="Producto">
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
        <Typography variant='h6'>Se enviará a</Typography>
        <Select
          label="Producto">
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
        </Grid>
        <Grid item xs={6}>
          <Box sx={{ height: 200,  backgroundColor: 'primary.dark'}} />
        </Grid>
        <Grid item xs={6} />
        <Grid item xs={6}>
        <Typography variant='h1' component='h1'>Botones</Typography>
        <Typography variant='h1' component='h1'>Botones</Typography>
        
        </Grid>
      </Grid>
    </LayoutPrincipal>
  )
}

export default Home
