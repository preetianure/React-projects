import { Redirect, Route } from "react-router-dom";
import {useState} from 'react';
import Profile from "./Components/Profile";
import SignUp from "./Components/SignUp";
import Layout from './Components/Layout/Layout';
import { Switch } from "react-router-dom";
import Details from "./Components/Details";
import Forgot from "./Components/Forgot";
import Expenses from './Components/Expenses/Expenses'
import ExpenseList from "./Components/Expenses/ExpenseList";
import { useSelector,useDispatch } from "react-redux";
import axios from "axios";
import { authActions } from "./store/AuthRedux";
import { expActions } from "./store/ExpenseRedux";
function App() {
  const dispatch = useDispatch();
  dispatch(authActions.setIsAuth());
  
  const userId = useSelector((state) => state.auth.userId);
  
  axios
    .get(
      `https://expence-tracker-ba033-default-rtdb.firebaseio.com/${userId}.json`
    )
    .then((res) => {
      let datas = res.data;
      let expArray = [];
      for (let id in datas) {
        let expenses = datas[id];
        expenses.id = id;
        expArray.push(expenses);
      }
      dispatch(expActions.addExpense(expArray));
    });
  return (
    <Layout>
      <Switch>
        <Route path='/' exact>
          <SignUp/>
        </Route>
        <Route path='/profile'>
          <Profile />
        </Route> 
        <Route path='/details'>
          <Details/>
        </Route>
        <Route path='/expenses' exact>
          <Expenses/>
          
        </Route>
        <Route path='/forgot' exact>
          <Forgot/>
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
 