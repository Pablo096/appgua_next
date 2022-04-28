import React, { FC, PropsWithChildren } from 'react'
import { NavBar } from './'

interface Props {
  title?: string;
  pageDescription?: string;
  imageFullUrl?: string;
}

export const LayoutPrincipal: FC<PropsWithChildren<Props>> = ( { children }) => {
  return (
    <div className='fondoCirculo'>
      <NavBar />

      <main style={{
            margin: '150px auto',
            maxWidth: '1440px',
            padding: '0px 30px'
        }}>
        { children }
      </main>

    </div>
  )
}
