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
import { ROUTES } from './Path';
//import { PRIVATE1,PRIVATE2,PRIVATE3,PRIVATE4,PRIVATE5,PRIVATE6,PUBLIC1, PUBLIC3} from './Path';
import Layaut from './Layout';


const Menu: React.FC = () => {
    return (
      <Container>
        <div>
           <Layaut/>
        </div>
  <Routes>
    <Route path={ROUTES.ROOT} element={<Home />} />
    <Route path={ROUTES.PRIVATE.PRODUCTS} element={<Products />} />
    <Route path={ROUTES.PRIVATE.NEW} element={<Mynew />} />
    <Route path={ROUTES.PRIVATE.UPLOAD_IMAGE} element={<Uploadimage />} />
    <Route path={ROUTES.PRIVATE.UPLOAD_JSON} element={<UploadJson />} />
    <Route path={ROUTES.PRIVATE.LIST_PRODUCTS} element={<ListProducts />} />
    <Route path={ROUTES.PRIVATE.BACKEND} element={<ProductsListView />} />
    <Route path={ROUTES.PUBLIC.USER} element={<Login />} />
  <Route path={ROUTES.PUBLIC.OFFERS} element={<Offers />} />
</Routes>
    </Container>
  );
}

export default Menu;