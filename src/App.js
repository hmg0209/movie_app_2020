import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Home from './routes/Home';
import Detail from './routes/Detail';
import Gnb from './component/Gnb';

import './scss/App.scss'

function App() {
 return (
   <BrowserRouter>
     <Gnb/>
     <Route path="/" exact={true} component={Home}/>
     <Route path="/movie/:id" exact={true} component={Detail}/>
   </BrowserRouter>
 );
}

export default App;