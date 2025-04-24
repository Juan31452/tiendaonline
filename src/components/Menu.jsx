import React from 'react'
import { Container } from 'react-bootstrap';
import { Route, Routes } from 'react-router-dom';
import Home from '../pages/home';
import Products from '../pages/products';
import CalzadoJM from '../pages/calzadojm';
import { PRIVATE1,PRIVATE2} from './Path';
import Layaut from './Layout';


const Menu = () => {
    return (
      <Container>
        <div>
           <Layaut/>
        </div>
      
       
      <Routes>
         <Route path="/" element={<Home />} />
         <Route path={PRIVATE1} element={<Products />} />
         <Route path={PRIVATE2} element={<CalzadoJM />} />
      </Routes>
      </Container>
    );
    
  }
  
  export default Menu