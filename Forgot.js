import { Fragment,useState,useRef } from "react";
import classes from './Forgot.module.css';
const Forgot=()=>{
   const emailInputRef=useRef();
    const EventHandler=(event)=>{
        event.preventDefault();
        const enteredEmail=emailInputRef.current.value;
        
        fetch('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDTSjffJZrsozwNWNDOff6iopcFac65R-g',{
            method:'POST',
            body:JSON.stringify(
              {
                requestType:"PASSWORD_RESET",
                email:enteredEmail
              }
            ),
            headers :{
              'Content-Type':'application/json'
            }
          }
          ).then(res=>{  
            if(res.ok){
              return res.json();
    
            }
            else{
              return res.json().then((data)=>{
                let errorMessage='Authenticated Failed';
                throw new Error(errorMessage);
              })
            }
          }).then((data)=>{
            console.log(data)
          })
          .catch((err)=>{
            alert(err.message)
          })
    }
    return(
       <Fragment>
        <form className={classes.auth} onSubmit={EventHandler}>
        <h4>Enter the Email ,which You have registered</h4>
        <div>
        <label>Email</label>
        <input type='text' ref={emailInputRef} />
        </div>
        <button type='submit' >Send Link</button>

        </form>
       </Fragment> 
    )
}
export default Forgot;