import React, { useState ,useContext} from "react";
import axios from "axios";
import { Context } from "../context/context";

export default function LoginForm({setLogin, setSignUp}) {
  const {  setIsLogin,  setUserInfo} = useContext(Context)


  const [message, setMessage] = useState('')

  const [userInput, setUserInput] = useState({
    email: "",
    password: "",
  });

  const onChangeHandler = (e) => {
    setUserInput((prevUser) => ({
      ...prevUser,
      [e.target.name]: e.target.value,
    }));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    axios.post("/user/login", userInput)
      .then((response) => {
        
        if(response.data.login){
          setIsLogin(true)
          setUserInfo(response.data)
          setLogin(false)
          setSignUp(false)
          
        } else{
          setMessage(response.data)
        }
         
        // console.log(response)
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
     <form onSubmit={submitHandler}>
        <label>Email:</label>
        <input type="email" name="email" onChange={onChangeHandler} />
        <br />
        <label>Password:</label>
        <input type="password" name="password" onChange={onChangeHandler} />
        <button type="submit">Log in</button>
      </form>
      <h4>{message}</h4>
    </div>
  );
}