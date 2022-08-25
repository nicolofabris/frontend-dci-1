import React from 'react'
import { useContext } from 'react'
import { Context } from '../context/context'
import Cart from './Cart'
import Header from './Header'
import Product from './Product'

export default function LandingPage() {
  
  const {isLogin} = useContext(Context)

  return (
    <div>
        <Header/>
        {isLogin && <Cart />}
        <Product/>
    </div>
  )
}
