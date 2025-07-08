import React from 'react'
import { Container } from 'react-bootstrap';
import { Route, Routes } from 'react-router-dom';
import Home from '../pages/home';
import Products from '../pages/products';
import Mynew from '../pages/new';
import Uploadimage from '../utils/ImageUploader';
import UploadJson from '../utils/UploadJson';
import ListProducts from '../utils/ListProducts';
import ProductsListView from '../pages/ProductListView';

import { PRIVATE1,PRIVATE2,PRIVATE3,PRIVATE4,PRIVATE5,PRIVATE6} from './Path';
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

      </Routes>
      </Container>
    );
    
  }
  
  export default Menu