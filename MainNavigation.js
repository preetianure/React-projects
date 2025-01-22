import { Link ,useHistory} from "react-router-dom"
import classes from './MainNavigation.module.css';
import { useContext } from "react";
import { useSelector,useDispatch } from "react-redux";
import { authActions} from "../../store/AuthRedux";
const MainNavigation=()=>{
  const dispatch=useDispatch();
  const userLoggin=useSelector(state=>state.auth.isAuthenticated)
 
  const history=useHistory();
  const logoutHandler=()=>{
   dispatch(authActions.logout())
    history.replace('/')

  }
    return(
        <header className={classes.header}>
        <nav>
          <ul>
            {!userLoggin&&(<li>
            <Link to='/'>Login</Link>
             </li>
          )}
          {userLoggin&&(<li>
              <Link to='/expenses'>Expenses</Link>
             </li>)}

            {userLoggin&&(<li>
            <Link to='/profile'>Profile</Link>
             </li>
            )}
             <li>
             {userLoggin&&(
            <li>
            <button onClick={logoutHandler}>Logout</button>
            </li>
            )}
             </li>
             
          </ul>
        </nav>
      </header>
    )
}
export default MainNavigation;