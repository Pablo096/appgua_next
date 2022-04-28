import { GetServerSideProps } from 'next'

import { Grid, Typography, Divider, Select, MenuItem, Box, InputLabel, OutlinedInput, FormControl, ButtonBase, Button, IconButton, SelectChangeEvent } from "@mui/material"
import { NextPage } from "next"
import { LayoutPrincipal } from "../components"
import { appguaApi } from '../api';
import { Direccion, Producto, UserInfoResponse, PedidoResponse } from '../interfaces';
import Image from 'next/image';
import { Add, HorizontalRule } from '@mui/icons-material';
import { useState, useEffect } from 'react';

interface Props {
    user: UserInfoResponse
}

const HomePage: NextPage<Props> = ( {user} ) => {

    const productoDefault: Producto = {
      id: -1, 
      activo: false, 
      fechaFin: {_nanoseconds: 0, _seconds: 0}, 
      price: 0, 
      idEmpresa: '1', 
      name: 'Sin producto', 
      list_price: 0, 
      points: 0 }
    
    const direccionDefault: Direccion = {
      alias: "",
      direccion: "",
      fechaCreacion: {_nanoseconds: 0, _seconds: 0}, 
      id: '-1',
      lat: 0,
      lng: 0,
      predeterminado: false,
      referencia: ""
    }

    const [cantidad, setCantidad] = useState(0);
    const [producto, setProducto] = useState<Producto>(productoDefault);
    const [direccion, setDireccion] = useState<Direccion>(direccionDefault);


    useEffect(() => {
      setProducto(user.objeto.productos.at(0) as Producto);
      setDireccion(user.objeto.direcciones.at(0) as Direccion);
    }, []);
    
    const onIncrementar = () => {
      setCantidad(
        cantidad + 1
      );
    }

    const onDecrementar = () => {
      if (cantidad > 0) {
        setCantidad(
          cantidad - 1
        );
      }
    }

    const onCambiarProducto = (event: SelectChangeEvent) => {
      const nuevoProducto = user.objeto.productos.find(producto => producto.name == event.target.value) as Producto;
      setProducto(nuevoProducto);
    }

    const onCambiarDireccion = (event: SelectChangeEvent) => {
      const nuevaDireccion = user.objeto.direcciones.find(direccion => direccion.alias == event.target.value) as Direccion;
      setDireccion(nuevaDireccion);
    }

    const onSolicitar = async () => {
      const resp = await  appguaApi.post<PedidoResponse>(`pedidos/cliente/app/${user.objeto.idUsuario}`, {
        cantidad: cantidad,
        costo: cantidad * producto.price,
        direccion: direccion?.alias,
        direccionGeocode: direccion?.direccion,
        lat: direccion?.lng,
        lng: direccion?.lng,
        nombreUsuario: user.objeto.nombre,
        producto: producto.name,
        programacion: 0,
        cupon: "",
        idPromocion: ""
      });

      console.log(resp);

    }

    return (
      <LayoutPrincipal >
        <Grid container spacing={2}  direction="column" style={{width: 400}}>
         
          <Grid item xs={12} >
            <Typography className='textoNombreUsuario'>{user.objeto.nombre}</Typography>
            <Divider color='white'/>
          </Grid>

	        <Grid item xs={12} container>
            <Grid item xs={6} container direction="column">
              <Grid item >
                <Typography className='textoInfo'>Producto</Typography>
                <FormControl sx={{  width: 200 }} variant="standard">      
                  <Select value={ producto.name } onChange={onCambiarProducto}>
                    {
                        (user.objeto.productos.map( producto => (
                            <MenuItem value={producto.name} key={producto.id}>{producto.name}</MenuItem>
                        )))
                    }
                  </Select>
                </FormControl>
              </Grid>
              <Grid  item>
                <Typography className='textoInfo'>Se enviará a</Typography>
                <FormControl sx={{  width: 200 }} variant="standard">      
                  <Select value={direccion?.alias} onChange={onCambiarDireccion}>
                  {
                    (user.objeto.direcciones.map( direccion => (
                        <MenuItem value={direccion.alias} key={direccion.id}>{direccion.alias}</MenuItem>
                    )))
                  } 
                  </Select>
                </FormControl>      
              </Grid>
              <Grid item xs={3} container >
                <Grid item xs>
                  <Grid item xs container direction="column">
                  <Grid item xs>
                    <Typography className='textoInfo'>Cantidad</Typography>
                  </Grid>
                  <Grid item xs>
                    <Typography variant='h6'>{cantidad}</Typography>
                  </Grid>
                  </Grid>         
                </Grid>


                <Grid item xs>
                  <Grid item xs container direction="column">
                  <Grid item xs>
                    <Typography className='textoInfo'>Total</Typography>
                  </Grid>
                  <Grid item xs>
                    <Typography variant='h6'>$ {cantidad * producto.price}.00</Typography>
                  </Grid>
                  </Grid>         
                </Grid>
              </Grid>


            </Grid>

            <Grid item  xs={6} container direction="column" alignItems='center'>
              <Grid item >            
                <Box paddingTop={5}>
                  <Image        
                  src='/botellón.png'
                  width={100}
                  height={180}            
                  />
                </Box>
              </Grid>
              <Grid item>
                <Grid item container xs={12} paddingY={3}>
                  <Grid item xs>
                    <IconButton className='botonMenos' onClick={onDecrementar}>
                      <HorizontalRule />
                    </IconButton>
                  </Grid>
                  <Grid item xs>
                    <IconButton className='botonMas' onClick={onIncrementar}>
                      <Add />
                    </IconButton>
                  </Grid>
              </Grid>
              <Grid item >
                  <Button className='botonAzul' onClick={onSolicitar}>Solicitar</Button>
              </Grid>
              </Grid>        
            </Grid>      
          </Grid>

        </Grid>

      </LayoutPrincipal>
    )
  }
  
  
  // You should use getServerSideProps when:
  // - Only if you need to pre-render a page whose data must be fetched at request time
  
  export const getServerSideProps: GetServerSideProps = async ( { params }) => {
      
    const { id } = params as { id: string };
    
    const { data } = await  appguaApi.get<UserInfoResponse>(`usuario/info/sesion/${id}`);
  
      return {
          props: {
              user: data
          }
      }
  }
              
  
export default HomePage