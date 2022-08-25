import React, { useState ,useContext } from 'react'
import { Context } from "../context/context";

export default function SignUpForm({setSignUp, setLogin}) {

    const {  setIsLogin,  setUserInfo} = useContext(Context)

    const [userInput, setUserInput] = useState({
        username: '',
        password: '',
        email: '',
        street: '',
        city: '',
        zipcode: '',
        
        })

    const onChangeHandler = (e) => {
        setUserInput((prevUser) => ({
        ...prevUser,
        [e.target.name]: e.target.value,
        }));
        } 

    const signUpHandler = e =>{
        e.preventDefault();
        // console.log(userInput)
        fetch('/user/signup', {
        method: 'POST',
        body: JSON.stringify(userInput),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
        })
        .then((response) => response.json())
        .then((json) => {
            if(json.err) alert(json.err)
            else {
                alert('Welcome '+ json.username)
                setIsLogin(true)
                setUserInfo(json)
                setSignUp(false)
                setLogin(false)
            }
        });
    }

    const addFakeUser = e =>{
        e.preventDefault();
        fetch('/user/add')
        .then((response) => response.json())
        .then((json) => {
            if(json.err) alert(json.err)
            else {
                alert('Welcome '+ json.username)
                setIsLogin(true)
                setUserInfo(json)
                setSignUp(false)
                setLogin(false)
            }
        });
    }
    
  return (
    <form onSubmit={signUpHandler}>
        <div>
            User Name:
            <input type="text" name='username' onChange={onChangeHandler}/>
        </div>
        <div>
            Password:
            <input type="text" name='password' onChange={onChangeHandler}/>
        </div>
        <div>
            Email:
            <input type="email" name="email" onChange={onChangeHandler}/>
        </div>
        <div>
            Street:
            <input type="text" name='street' onChange={onChangeHandler}/>
        </div>
        <div>
            City:
            <input type="text" name='city' onChange={onChangeHandler}/>
        </div>
        <div>
            Zip Code:
            <input type="number" name='zipcode' onChange={onChangeHandler}/>
        </div>

        <button type="submit">Sign up</button>

        <button onClick={addFakeUser}>addFakeUser</button>
    </form>
  )
}
