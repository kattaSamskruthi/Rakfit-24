import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "../actions/product";
import NavBar from "../components/NavBar";
import ProductGrid from "../components/ProductGrid";

const Shop = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.session.user);
    const userId = user?.id;
  
    useEffect(() => {
    //   dispatch(getSavedLooks({ userId, setAsFeed: false }));
      dispatch(getProduct());
    }, [dispatch, userId]);
  
    const breakpoints = {
      default: 5,
      1200: 4,
      1100: 3,
      700: 2,
      500: 1,
    };
  
    const state = useSelector((state) => state);
   
  
    return (
      <div>
        <NavBar />
        <ProductGrid products={state.product.product} userId={userId} photoUrls={state.product.shop} breakpoints={breakpoints} />
      </div>
    );
};


export default Shop