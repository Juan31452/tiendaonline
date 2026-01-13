import React, {  useContext} from 'react'
import { Container } from 'react-bootstrap';
import { Route, Routes, useLocation} from 'react-router-dom';
import Home from '../pages/home';
import Mynew from '../pages/new';
import Offers from '../pages/offers';
import Products from '../pages/products';
import Uploadimage from '../utils/ImageUploader';
import UploadJson from '../utils/UploadJson';
import ListProducts from '../utils/ListProducts';
import ProductsListView from '../pages/ProductListView';
import Login from '../pages/Login';
import { AuthContext } from './Context/AuthContext';
import PrivateRoute from './PrivateRoute';
import { PRIVATE1,PRIVATE3,PRIVATE4,PRIVATE5,PRIVATE6,PUBLIC1,PUBLIC2, PUBLIC3} from './Path';
import Layout from './Layout';
import PWAInstall from './PWAInstall'; // 1. Importamos el nuevo componente

const Menu = () => {
  const location = useLocation(); 
  const { role } = useContext(AuthContext);
  console.log("Rol actual:", role);
  return (
    <Container> 
      <Layout />
      <PWAInstall /> {/* 2. Usamos el componente aquí */}

      <Routes location={location}>
        {/* Rutas públicas */}
        <Route path="/" element={<ProductsListView />} />
        <Route path={PUBLIC1} element={<Login />} />
        <Route path={PUBLIC2} element={<Mynew />} />
         {/*}<Route path={PUBLIC3} element={<Offers />} />
        <Route path={PRIVATE6} element={<ProductsListView />} />   */}
        
        {/* Rutas privadas */}
        {/*<Route
          path={PRIVATE1}
          element={
            <PrivateRoute allowedRoles={['admin']}>
              <Products />
            </PrivateRoute>
          }
        />*/}
        
        {/*}
        <Route
          path={PRIVATE6}
          element={
            <PrivateRoute allowedRoles={['admin', 'vendedor']}>
              <ProductsListView />
            </PrivateRoute>
          }
        />
        */}
        
        <Route
          path={PRIVATE3}
          element={
            <PrivateRoute allowedRoles={['admin']}>
              <Uploadimage />
            </PrivateRoute>
          }
        />
        <Route
          path={PRIVATE4}
          element={
            <PrivateRoute allowedRoles={['admin']}>
              <UploadJson />
            </PrivateRoute>
          }
        />
        <Route
          path={PRIVATE5}
          element={
            <PrivateRoute allowedRoles={['admin']}>
              <ListProducts />
            </PrivateRoute>
          }
        />
      </Routes>
    </Container>
  );
};

export default Menu;