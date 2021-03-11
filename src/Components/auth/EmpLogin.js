import React, { useState } from "react";
import { faUserLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { Redirect } from "react-router";

const EmpLogin = () => {
  const [userName,setUserName] = useState('')
  const [password,setPassword] = useState('')
  const [redirect,setRedirect] = useState(false)
  const verifyLogin = async()=>{
    const params={user_name:userName,password:password}
    try {
      const res = await axios.get('/authenticate',{params:params});
        console.log('verifyLogin',res.data)
        if(res.data.login==true){
          localStorage.userId=res.data.id
          localStorage.username=res.data.user_name
          setRedirect(true)

        }else{
          alert("Invalid Username or Password")
        }
    } catch (err) {
      console.log(err);
    }

  }
  
 if(redirect==false){
  return (
    <div
      id="employee"
      className="container tab-pane fade  animate__animated animate__pulse"
    >
      <br />
      <span className=" d-flex mx-auto">
        <FontAwesomeIcon
          icon={faUserLock}
          size="3x"
          color="slateblue"
          className="mx-auto"
        />
      </span>
      <br />
      
        <div className="form-group">
          <label htmlFor="username" className="h6">
            Username :-
          </label>
          <input
            type="email"
            required
            className="form-control"
            placeholder="Enter username"
            name="username"
            onChange={(e)=>setUserName(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="password" className="h6">
            Password :-
          </label>
          <input
            type="password"
            required
            className="form-control"
            placeholder="Enter password"
            name="password"
            onChange={(e)=>setPassword(e.target.value)}
          />
        </div>
        <br />
        <button type="submit" className="btn btn-primary" onClick={verifyLogin}>
          Login
        </button>
    </div>
  );
 }else if(redirect==true){

   return(
     <Redirect to='/'></Redirect>
   )

 }
}

export default EmpLogin;
