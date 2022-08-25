import React from 'react'
import { useContext } from 'react'
import { Context } from '../context/context'


export default function Cart() {
    const {cart} = useContext(Context)
  return (
    <div>
        {JSON.stringify(cart)}
    </div>
  )
}
