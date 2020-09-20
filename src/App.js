import React from 'react';
import './App.css';
import {CarsalesStore} from "./actions/CarsalesStore";
import { Provider} from "react-redux"
import CarDisplayList from './Components/CarDisplayList';
import {Container} from "@material-ui/core";
import {ToastProvider} from "react-toast-notifications"
import Home from   "./Components/Home";
import Navigation from   "./Components/Navigation";
import 'bootstrap/dist/css/bootstrap.min.css';


import {BrowserRouter,Route,Switch} from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Navigation></Navigation>
     <Switch>
       <Route path='/' component={Home} exact></Route>
       <Provider store={CarsalesStore} >
      <ToastProvider autoDismiss={true}>
        <Container maxWidth="lg"></Container>
        <Route path='/CarDisplayList' component={CarDisplayList} exact></Route>  
      </ToastProvider>
    </Provider>     
     </Switch>

 
</BrowserRouter>


 
  );
}

export default App;
