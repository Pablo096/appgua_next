import { Dehaze, FacebookOutlined, Instagram, MenuBook  } from '@mui/icons-material'
import { AppBar, Toolbar, Typography, Link, Box, Button, IconButton, Badge, Menu } from '@mui/material'
import Image from 'next/image'
import NextLink from 'next/link'
import { SideMenu } from './SideMenu'
import logo from '../images/logo.png';

export const NavBar = () => {
  return (
    <AppBar>
        <Toolbar sx={{paddingLeft: {xs: '50px', sm: '200px'}, paddingRight: {xs: '50px', sm: '200px'}}} >
            <Image   
                src={logo}
                alt="Logotipo"
                width={70}
                height={60} />

            <Box flex='1' />

            <Box sx={{ display: { xs: 'none', sm: 'block'}}}>
                <NextLink href='/' passHref>
                    <Link>
                        <Button>Recarga</Button>
                    </Link>
                </NextLink>
                <NextLink href='/' passHref>
                    <Link>
                        <Button>Blog</Button>
                    </Link>
                </NextLink>
                <NextLink href='/' passHref>
                    <Link>
                        <Button>Web</Button>
                    </Link>
                </NextLink>
                <NextLink href='/' passHref>
                    <Link>
                        <Button>Contactos</Button>
                    </Link>
                </NextLink>

                <IconButton sx={{marginLeft: 15}}>
                    <FacebookOutlined />
                </IconButton>

                <IconButton>
                    <Instagram />
                </IconButton>

            </Box>
        
            <IconButton sx={{ display: { xs: 'block', sm: 'none'}}}>
                <Dehaze />
            </IconButton>

        </Toolbar>
    </AppBar>
  )
}
