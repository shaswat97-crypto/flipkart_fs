import React, { useEffect, useLayoutEffect } from "react";
import ProductsList from "./ProductsList";
import UsersList from "./UsersList";
import AddProduct from "./AddProduct";
import Header from "./Header";
import Footer from "../Footer";
import { useNavigate } from "react-router-dom";
const App = () => {
    const navto = useNavigate();
    useLayoutEffect(()=>{
        if(!localStorage.getItem('flipkartAdminToken')){
            navto('/login')
        }
    }, [localStorage.getItem('flipkartAdminToken')]);
    
  return (
    <>
      <Header />
      <div>
        <h1>Admin Console</h1>
        <AddProduct />
        <ProductsList />
        <UsersList />
      </div>
      <Footer />
    </>
  );
};
export default App;
