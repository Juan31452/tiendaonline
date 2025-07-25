import React from 'react'
import { Container } from 'react-bootstrap';
import { Route, Routes } from 'react-router-dom';
import Home from '../pages/home';
import Mynew from '../pages/new';
import Offers from '../pages/offers';
import Products from '../pages/products';
import Uploadimage from '../utils/ImageUploader';
import UploadJson from '../utils/UploadJson';
import ListProducts from '../utils/ListProducts';
import ProductsListView from '../pages/ProductListView';
import Login from '../pages/Login';

import { PRIVATE1,PRIVATE2,PRIVATE3,PRIVATE4,PRIVATE5,PRIVATE6,PUBLIC1, PUBLIC3} from './Path';
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
         <Route path={PRIVATE2} element={<Mynew/>} />
          <Route path={PRIVATE3} element={<Uploadimage />} />
          <Route path={PRIVATE4} element={<UploadJson />} />
          <Route path={PRIVATE5} element={<ListProducts />} />
          <Route path={PRIVATE6} element={< ProductsListView />} />
          <Route path={PUBLIC1} element={< Login/>} />
          <Route path={PUBLIC3} element={<Offers />} />
      </Routes>
      </Container>
    );
    
  }
  
  export default Menu