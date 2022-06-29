import { GetServerSideProps, GetStaticPaths, GetStaticProps } from 'next'

import { Grid, Typography, Divider, Select, MenuItem, Box, InputLabel, OutlinedInput, FormControl, ButtonBase, Button, IconButton, SelectChangeEvent, Icon, Stack, makeStyles } from "@mui/material"
import { NextPage } from "next"
import { LayoutPrincipal } from "../components"
import { appguaApi } from '../api';
import { Direccion, Producto, UserInfoResponse, PedidoResponse } from '../interfaces';
import Image from 'next/image';
import { Add, AddTask, HorizontalRule } from '@mui/icons-material';
import { useState, useEffect } from 'react';
import vendedor1 from '../images/vendedor1.png';
import vendedor2 from '../images/vendedor2.png';
import botellon from '../images/botellon.png';

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
    const [solicitudAprobada, setSolicitudAprobada] = useState(false);

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
      if (cantidad > 0) {
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

        setSolicitudAprobada(resp.data.error);
      }
    }
    
    const styleTextInfo = {
      color: 'white',
      opacity: 0.7,
      fontSize: 'large'
    }

    const styleNombreUsuario = {
      color: 'white',
      fontSize: 'xx-large',
      fontWeight: 'bold',
    }

    const styleOpciones = {
      color: '#243E5D',
      fontFamily: 'Arial, Helvetica, sans-serif',
      fontWeight: 'bold',
      fontSize: '20px'
    }

    const styleBotonMas = {
      borderRadius: '0px 30px 30px 0px',
      backgroundColor: 'white',
      margin: '0px',
      width: '100%',
      color: '#243E5D'
    }

    const styleTextoCantidad = {
      color: '#243E5D',
      fontWeight: 'bold',
      fontSize: '40px',
      margin: '70px 40px',
    }
    const styleSolicitudAprobada = {
      color: '#243E5D',
      fontSize: '250%',
      fontWeight: '900',
      fontFamily: 'Impact, Haettenschweiler, Arial Narrow Bold, sans-serif fantasy',
     fontStretch: 'extra-condensed',
      fontStyle: 'italic',
      lineHeight: '40px'
    }
    const styleBotonAzul = {
      backgroundColor: '#243E5D',
      borderRadius: '30px',
      width: '220px',
      height: '40px',
      padding: '10px 0px',
      margin: '0px'
    }
    const styleBotonMenos = {
      borderRadius: '30px 0px 0px 30px',
      backgroundColor: '#A4D8EB',
      margin: '0px',
      width: '100%',
      color: '#243E5D'
    }

    return (
      <LayoutPrincipal >
        
        <Box display='flex' height='79vh' sx={{marginLeft: {xs: '5%', sm: '20%'}, flexDirection: {xs: 'column', sm: 'row'}}} >
 
          <div>
            <Grid container spacing={2}  direction="column" sx={{width: {xs: '200px', sm: '420px'}}}>
            
            <Grid item xs={12} >
              <Typography style={styleNombreUsuario}>{user.objeto.nombre}</Typography>
              <Divider color='white'/>
            </Grid>

            {
              !solicitudAprobada ? 
              <Grid item xs={12} container>
              <Grid item xs={6} container direction="column" spacing={2}>
                <Grid item >
                  <Typography style={styleTextInfo} >Producto</Typography>
                  <FormControl sx={{width: '200px'}} variant="standard">
                    <Select value={ producto.name } onChange={onCambiarProducto} style={styleOpciones} disableUnderline>
                      {
                          (user.objeto.productos.map( producto => (
                              <MenuItem style={styleOpciones} value={producto.name} key={producto.id}>{producto.name}</MenuItem>
                          )))
                      }
                    </Select>
                  </FormControl>     
                </Grid>
                <Grid  item>
                  <Typography style={styleTextInfo}>Se enviará a</Typography>
                  <FormControl sx={{width: '200px'}} variant="standard">      
                    <Select value={direccion?.alias} onChange={onCambiarDireccion} style={styleOpciones} disableUnderline>
                    {
                      (user.objeto.direcciones.map( direccion => (
                          <MenuItem style={styleOpciones} value={direccion.alias} key={direccion.id}>{direccion.alias}</MenuItem>
                      )))
                    } 
                    </Select>
                  </FormControl>      
                </Grid>
                <Grid item xs={3} container >
                  <Grid item xs>
                    <Grid item xs container direction="column">
                    <Grid item xs>
                      <Typography style={styleTextInfo}>Cantidad</Typography>
                    </Grid>
                    <Grid item xs>
                      <Typography style={styleOpciones}>{cantidad}</Typography>
                    </Grid>
                    </Grid>         
                  </Grid>


                  <Grid item xs>
                    <Grid item xs container direction="column">
                    <Grid item xs>
                      <Typography style={styleTextInfo}>Total</Typography>
                    </Grid>
                    <Grid item xs>
                      <Typography style={styleOpciones}>$ {cantidad * producto.price}.00</Typography>
                    </Grid>
                    </Grid>         
                  </Grid>
                </Grid>


              </Grid>

              <Grid item  xs={6} container direction="column" display="flex" sx={{alignItems: {xs:'end', sm: 'center'} }} >
                <Grid item >            
                  <Box paddingTop={5} position="relative">                    
                    <Typography position="absolute"  style={styleTextoCantidad}>{cantidad}</Typography>                 
                    <Image        
                      src={botellon}
                      alt="Imagen de garrafon"
                      width={100}
                      height={180}/>                
                  </Box>
                </Grid>
                <Grid item>
                  <Grid item container xs={12} paddingY={3}>
                    <Grid item xs>
                      <IconButton style={styleBotonMenos} onClick={onDecrementar}>
                        <HorizontalRule />
                      </IconButton>
                    </Grid>
                    <Grid item xs>
                      <IconButton style={styleBotonMas} onClick={onIncrementar}>
                        <Add />
                      </IconButton>
                    </Grid>
                </Grid>
                <Grid item >
                    <Button  style={styleBotonAzul} onClick={onSolicitar}>Solicitar</Button>
                </Grid>
                </Grid>        
              </Grid>      
            </Grid>
            : 
            <Box display='flex' flexDirection='row' marginY={10} alignItems='center'>
              <Box width={300}>
                <Typography style={styleSolicitudAprobada}>Tu solicitud ha sido aprobada</Typography>
              </Box>
              <AddTask fontSize='large' color='primary'/>
            </Box>
            }
           

            </Grid>
          </div>
            
          <Box width={50} />
            
          <Box display='flex' alignItems='flex-end' >
            {
              !solicitudAprobada ? 
              <Image       
              src={vendedor1}
              alt="Imagen de vendedor"
              width={550} height={500} />
              :   
              <Image    
              src={vendedor2}
              alt="Imagen de vendedor"
              width={550} height={550} />
            }       
          </Box>
        
        </Box>
        
      </LayoutPrincipal>
    )
  }
  
  
  // You should use getServerSideProps when:
  // - Only if you need to pre-render a page whose data must be fetched at request time
/*  
  export const getServerSideProps: GetServerSideProps = async ( { params }) => {
      
    const { id } = params as { id: string };
    
    const { data } = await  appguaApi.get<UserInfoResponse>(`usuario/info/sesion/${id}`);
  
      return {
          props: {
              user: data
          }
      }
  }
  */ 

  // You should use getStaticPaths if you’re statically pre-rendering pages that use dynamic routes  
  export const getStaticPaths: GetStaticPaths = async (ctx) => {
    //const { data } = await  // your fetch function here 
    const { data } = await  appguaApi.get<string[]>("clientes/id");
    //const idUsuarios = ["U0OofwZIe7dhcXAIzMne8Suu2e92"];
    
    return {
      paths: data.map( id => ({
        params: {
            id
        }
      })),
      fallback: "blocking"
    }
  }
  
// You should use getStaticProps when:
//- The data required to render the page is available at build time ahead of a user’s request.
//- The data comes from a headless CMS.
//- The data can be publicly cached (not user-specific).
//- The page must be pre-rendered (for SEO) and be very fast — getStaticProps generates HTML and JSON files, both of which can be cached by a CDN for performance.

export const getStaticProps: GetStaticProps = async ( { params }) => {
  const { id } = params as { id: string };
  
  const { data } = await  appguaApi.get<UserInfoResponse>(`usuario/info/sesion/${id}`);
 
  if (data.error) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  /* Se regenera las páginas cada dos dias */
  return {
    props: {
      user: data
    },
    revalidate: 60 * 60 * 24 * 2
  }
}

export default HomePage
