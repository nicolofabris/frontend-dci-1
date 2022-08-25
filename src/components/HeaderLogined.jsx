import React, { useState } from 'react'
import { useEffect } from 'react'
// import { useState } from 'react'
import { useContext } from 'react'
import { Context } from '../context/context'
import baseUrl from '../config'

export default function HeaderLogined() {

    const {userInfo, setUpdateProductList, updateProductList} = useContext(Context)
    
    const [userProduct, setUserProduct] = useState()
        , [editInput, setEditInput] = useState({
            product_title:'',
            quantity: '',
            price: ''
        })
    
    // for updating a product

    const confirmUpdateHandler = (id, index) =>{
        fetch(baseUrl+'/product/update', {
            method: 'POST',
            body: JSON.stringify({...editInput, _id:id}),
            headers: {
              'Content-type': 'application/json; charset=UTF-8',
            },
            })
            .then((response) => response.json())
            .then(json=>{
                if(json.update){
                    setUpdateProductList(pre=>+pre+1)

                }
            })
    }

    const editInputHandler = e =>{
        setEditInput((pre) => ({
            ...pre,
            [e.target.name]: e.target.value,
          }))
        // console.log(editInput)
    }
    
    const editProduct = index =>{
        const newUserProduct = userProduct.map((ele,i)=>{
            if(+i===+index){
                ele.edit = !ele.edit
            }
            return ele
        })
        setUserProduct(newUserProduct)
    }

    // for delete a product
    const deleteProduct = id =>{
        fetch('/product/delete/'+ id)
        .then(res=>res.json(res))
        .then(data=>{
            alert('The Product is deleted')
            setUpdateProductList(pre=>+pre-1)
        }) 

    }

    // for add a fake product added_by current user
    const addFakerProduct = e =>{
        fetch('/product/add/'+ userInfo.id)
        .then(res=>res.json(res))
        .then(data=>{
            alert(data.msg + ' by '+ userInfo.username)
            setUpdateProductList(pre=>+pre+1)
            // console.log(updateProductList)
        }) 
    }

    // for showing the products added by current user
    const showUserProduct = e =>{
        fetch('/product/allByUser/'+ userInfo.id)
        .then(res=>res.json(res))
        .then(data=>{
            const newData = data.map(el=>{
                el.edit=true
                return el
            })
            setUserProduct(newData)      
        }) 
    }

    useEffect(()=>{
        if(userProduct){
            fetch('/product/allByUser/'+ userInfo.id)
            .then(res=>res.json(res))
            .then(data=>{
                const newData = data.map(el=>{
                    el.edit=true
                    return el
                })
                // console.log(newData)
                setUserProduct(newData)      
            }) 
        }
    }, [updateProductList])

  return (
    <div>
        <p>UserName: {userInfo.username}</p>
        <p>Email: {userInfo.email}</p>
        <p>Id: {userInfo.id}</p>

        <button onClick={addFakerProduct}>Add Faker Product</button>
        <button onClick={showUserProduct}>My Product</button>

        {userProduct && <>
           <hr />
           <h1>My Products</h1>
            {userProduct.map((ele,i)=>
            <div key={i}>
                {ele.edit ? <h2>{ele.product_title}</h2> : <input type="text" placeholder={ele.product_title} name='product_title' onChange={editInputHandler}/> }
                
                {ele.edit && <>
                    <button onClick={()=>deleteProduct(ele._id)}>Delete</button>
                    <button onClick={()=>editProduct(i)}>Update</button>
                </>}
                
                <h4>quantity: {ele.edit ? ele.quantity : <><input type="number" placeholder={ele.quantity} name='quantity' onChange={editInputHandler}/></>}</h4>

                <h4>price: {ele.edit ? ele.price : <><input type="number" placeholder={ele.price} name='price' onChange={editInputHandler}/></>}</h4>
                
                {!ele.edit && <>
                <button onClick={()=>confirmUpdateHandler(ele._id, i)}>Confirm Update</button>
                <button onClick={()=>editProduct(i)}>Cancel</button></>}
            </div>
            )}
            <hr />
        </>}
    </div>
  )
}
