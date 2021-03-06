import { Box } from '@mui/material';
import Head from 'next/head';
import React, { FC, PropsWithChildren } from 'react'
import { NavBar } from './'

interface Props {
  title?: string;
  pageDescription?: string;
  imageFullUrl?: string;
}

export const LayoutPrincipal: FC<PropsWithChildren<Props>> = ( { children }) => {
  return (
    <Box sx={{width: '100%', height: '90%', position: 'absolute', background: 'linear-gradient(90deg, #00AAE4, #056f92)', borderRadius: {xs: '0% 0% 20% 20%', sm: '0% 0% 50% 50%' }}}>
      <Head>
        <title>Appgua</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar />

      <main style={{
            margin: '150px auto',
            maxWidth: '1440px',
            padding: '0px 30px'
        }}>
        { children }
      </main>

    </Box>
  )
}
