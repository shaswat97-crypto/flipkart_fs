import React, { useEffect, useLayoutEffect, useState } from "react";
import ProductsList from "./ProductsList";
import UsersList from "./UsersList";
import AddProduct from "./AddProduct";
import Header from "./Header";
import Footer from "../Footer";
import { useNavigate } from "react-router-dom";
const App = () => {
  const [loading, setLoading] = useState(false);
  const navto = useNavigate();
  useLayoutEffect(() => {
    if (!localStorage.getItem("flipkartAdminToken")) {
      navto("/login");
    }
  }, [localStorage.getItem("flipkartAdminToken")]);

  return (
    <>
      <Header />
      <div>
        <h1>Admin Console</h1>
        <AddProduct loading={loading} setLoading={setLoading} />
        <div className="adminCont">
          <ProductsList loading={loading} setLoading={setLoading}  />
          <UsersList />
        </div>
      </div>
      {/* <Footer /> */}
    </>
  );
};
export default App;
