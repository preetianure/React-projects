import { useState,useRef,useContext } from 'react';
import { useHistory ,Link} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import classes from './SignUp.module.css';
import { authActions } from '../store/AuthRedux';

const SignUp= () => {

  const dispatch=useDispatch();
  const userLoggin=useSelector(state=>state.auth.isAuthenticated)
  const history=useHistory();
  const emailInputRef=useRef();
  const passwordInputRef=useRef();
  const [isLogin, setIsLogin] = useState(true);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };
  const SubmitHandler=(event)=>{
    event.preventDefault();
    const enteredEmail=emailInputRef.current.value;
    const enteredPassword=passwordInputRef.current.value;
    
    let url;
    if(isLogin){
      url='https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDTSjffJZrsozwNWNDOff6iopcFac65R-g';
    }
    else{
      url='https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDTSjffJZrsozwNWNDOff6iopcFac65R-g'
    }
      fetch(url,{
        method:'POST',
        body:JSON.stringify(
          {
            email:enteredEmail,
            password:enteredPassword,
            returnSecureToken:true
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
  
        dispatch(authActions.login(data.idToken))
        dispatch(authActions.setUserId(enteredEmail));
        history.replace('/profile')
      })
      .catch((err)=>{
        alert(err.message)
      })


  }

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={SubmitHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Email</label>
          <input type='email' id='email' required ref={emailInputRef}/><br/>
          &nbsp;
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Password</label>
          <input type='password' id='password' required ref={passwordInputRef}/><br/>
          &nbsp;
        </div>
        <div className={classes.actions}>
          <div>
          <button>{isLogin ? 'Login' : 'Create Account'}</button><br/>
          &nbsp;
          </div>
          <div>
            {!userLoggin&&(<Link to='/Forgot'>
            {isLogin&&<button type='submit'>Forgot Password</button>}<br/>
            &nbsp;
            </Link>
            )}
            
          </div>
          <div>
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
          &nbsp;
          </div>
        </div>
      </form>
    </section>
  );
};

export default SignUp;
